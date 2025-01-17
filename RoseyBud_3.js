class Example_3 extends Phaser.Scene {
    constructor() {
        super();
        this._isValidatingCheck = false;
        this.boardSize = {
            rows: 5,
            cols: 5
        };
        this.rowLengths = [4, 3, 4, 3, 4]; // Define the length of each row
        this.squareSize = 80;
        this.selectedPiece = null;
        this.currentTurn = 'White';
        this.validMoveHighlights = [];
        this.gameOver = false;
        this.statusText = null;
    }
    create() {
        this.cameras.main.setBackgroundColor('#2C3539');
        // Calculate board position to center it
        const boardWidth = this.boardSize.cols * this.squareSize;
        const boardHeight = this.boardSize.rows * this.squareSize;
        this.boardOffset = {
            x: (800 - boardWidth) / 2,
            y: (600 - boardHeight) / 2
        };
        // Create the chess board
        this.createBoard();
        // Initialize pieces
        this.pieces = this.add.group();
        this.initializePieces();

        // Add status text
        this.statusText = this.add.text(400, 50, '', {
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        this.updateGameStatus();
    }
    createBoard() {
        this.board = [];
        for (let row = 0; row < this.boardSize.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.rowLengths[row]; col++) {
                const x = this.boardOffset.x + col * this.squareSize;
                const y = this.boardOffset.y + row * this.squareSize;
                const isLight = (row + col) % 2 === 0;

                const square = this.add.rectangle(
                    x + this.squareSize / 2,
                    y + this.squareSize / 2,
                    this.squareSize,
                    this.squareSize,
                    isLight ? 0xb673e2 : 0x7d2bb2
                );

                square.setInteractive({
                    useHandCursor: true
                });
                square.on('pointerdown', () => {
                    if (this.selectedPiece) {
                        this.handleSquareClick(row, col);
                    }
                });
                this.board[row][col] = {
                    square: square,
                    piece: null
                };
            }
        }
    }
    initializePieces() {
        // Create temporary visual representations for pieces
        // White pieces
        this.createPiece(0, 3, 'White', 'King');
        this.createPiece(0, 0, 'White', 'Queen');
        // Black pieces
        this.createPiece(4, 3, 'Black', 'King');
        this.createPiece(4, 1, 'Black', 'Queen');
    }
    createPiece(row, col, color, type) {
        const x = this.boardOffset.x + col * this.squareSize + this.squareSize / 2;
        const y = this.boardOffset.y + row * this.squareSize + this.squareSize / 2;

        const piece = this.add.text(x, y, type === 'King' ? 'K' : 'Q', {
            fontSize: '48px',
            color: color === 'White' ? '#FFFFFF' : '#000000'
        }).setOrigin(0.5);
        piece.type = type;
        piece.color = color;
        piece.boardPos = {
            row,
            col
        };
        piece.setInteractive({
            useHandCursor: true
        });
        piece.on('pointerdown', () => {
            const row = piece.boardPos.row;
            const col = piece.boardPos.col;
            this.handleSquareClick(row, col);
        });
        this.board[row][col].piece = piece;
        this.pieces.add(piece);
    }
    handleSquareClick(row, col) {
        if (this.gameOver) return;
        const square = this.board[row][col];
        if (this.selectedPiece) {
            if (this.isValidMove(row, col)) {
                this.movePiece(row, col);
            }
            this.clearHighlights();
            this.selectedPiece = null;
        } else if (square.piece && square.piece.color === this.currentTurn) {
            this.selectedPiece = square.piece;
            this.showValidMoves();
        }
    }
    clearHighlights() {
        this.validMoveHighlights.forEach(highlight => highlight.destroy());
        this.validMoveHighlights = [];
    }
    showValidMoves() {
        this.clearHighlights();
        const validMoves = this.getValidMoves(this.selectedPiece);

        validMoves.forEach(move => {
            const highlight = this.add.circle(
                this.boardOffset.x + move.col * this.squareSize + this.squareSize / 2,
                this.boardOffset.y + move.row * this.squareSize + this.squareSize / 2,
                15,
                0x00ff00,
                0.5
            ).setInteractive({
                useHandCursor: true
            });
            highlight.on('pointerdown', () => {
                this.handleSquareClick(move.row, move.col);
            });
            this.validMoveHighlights.push(highlight);
        });
    }
    getValidMoves(piece) {
        const basicMoves = this.getBasicMoves(piece);

        // Filter out moves that would put or leave the king in check
        return basicMoves.filter(move => {
            // Save original position
            const originalPos = {
                ...piece.boardPos
            };
            const targetPiece = this.board[move.row][move.col].piece;

            // Simulate move
            this.board[originalPos.row][originalPos.col].piece = null;
            this.board[move.row][move.col].piece = piece;
            piece.boardPos = {
                row: move.row,
                col: move.col
            };

            // Check if king would be in check after this move
            // Pass the original position to ignore it in the check calculation
            const wouldBeInCheck = this.isKingInCheck(piece.color, originalPos);

            // Restore original position
            this.board[originalPos.row][originalPos.col].piece = piece;
            this.board[move.row][move.col].piece = targetPiece;
            piece.boardPos = originalPos;

            return !wouldBeInCheck;
        });
    }
    getBasicMoves(piece) {
        const moves = [];
        const {
            row,
            col
        } = piece.boardPos;
        if (piece.type === 'King') {
            const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1]
            ];
            directions.forEach(([dRow, dCol]) => {
                const newRow = row + dRow;
                const newCol = col + dCol;
                if (this.isInBounds(newRow, newCol) &&
                    (!this.board[newRow][newCol].piece ||
                        this.board[newRow][newCol].piece.color !== piece.color)) {
                    moves.push({
                        row: newRow,
                        col: newCol
                    });
                }
            });
        } else if (piece.type === 'Queen') {
            const directions = [
                [-1, 0], // vertical
                [1, 0],
                [0, -1], // horizontal
                [0, 1],
                [-1, -1], // diagonal
                [-1, 1],
                [1, -1],
                [1, 1]
            ];

            directions.forEach(([dRow, dCol]) => {
                let newRow = row + dRow;
                let newCol = col + dCol;

                while (this.isInBounds(newRow, newCol)) {
                    if (!this.board[newRow][newCol].piece) {
                        moves.push({
                            row: newRow,
                            col: newCol
                        });
                    } else {
                        if (this.board[newRow][newCol].piece.color !== piece.color) {
                            moves.push({
                                row: newRow,
                                col: newCol
                            });
                        }
                        break;
                    }
                    newRow += dRow;
                    newCol += dCol;
                }
            });
        }
        return moves;
    }
    validateMove(piece, targetRow, targetCol) {
        // Save original position
        const originalPos = {
            ...piece.boardPos
        };
        const targetPiece = this.board[targetRow][targetCol].piece;
        // Simulate move
        this.board[originalPos.row][originalPos.col].piece = null;
        this.board[targetRow][targetCol].piece = piece;
        piece.boardPos = {
            row: targetRow,
            col: targetCol
        };
        // Check if king would be in check after this move
        const wouldBeInCheck = this.isKingInCheck(piece.color);
        // Restore original position
        this.board[originalPos.row][originalPos.col].piece = piece;
        this.board[targetRow][targetCol].piece = targetPiece;
        piece.boardPos = originalPos;
        return !wouldBeInCheck;
    }
    isInBounds(row, col) {
        return row >= 0 && row < this.boardSize.rows &&
            col >= 0 && col < this.rowLengths[row];
    }
    isValidMove(row, col) {
        const validMoves = this.getValidMoves(this.selectedPiece);
        return validMoves.some(move => move.row === row && move.col === col);
    }
    movePiece(row, col) {
        const oldRow = this.selectedPiece.boardPos.row;
        const oldCol = this.selectedPiece.boardPos.col;
        // Remove piece from old position
        this.board[oldRow][oldCol].piece = null;
        // Capture piece if exists
        if (this.board[row][col].piece) {
            this.board[row][col].piece.destroy();
        }
        // Update piece position
        this.selectedPiece.x = this.boardOffset.x + col * this.squareSize + this.squareSize / 2;
        this.selectedPiece.y = this.boardOffset.y + row * this.squareSize + this.squareSize / 2;
        this.selectedPiece.boardPos = {
            row,
            col
        };
        this.board[row][col].piece = this.selectedPiece;

        // Check for check/checkmate after move
        this.currentTurn = this.currentTurn === 'White' ? 'Black' : 'White';
        this.updateGameStatus();
    }
    isKingInCheck(kingColor, ignorePosition = null) {
        // Find king position
        let kingPos;
        for (let row = 0; row < this.boardSize.rows; row++) {
            for (let col = 0; col < this.rowLengths[row]; col++) {
                if (this.board[row] && this.board[row][col] && this.board[row][col].piece) {
                    const piece = this.board[row][col].piece;
                    if (piece.type === 'King' && piece.color === kingColor) {
                        kingPos = {
                            row,
                            col
                        };
                        break;
                    }
                }
            }
            if (kingPos) break;
        }
        if (!kingPos) return false;
        // Check if any opponent piece can capture the king
        const opponentColor = kingColor === 'White' ? 'Black' : 'White';
        for (let row = 0; row < this.boardSize.rows; row++) {
            for (let col = 0; col < this.rowLengths[row]; col++) {
                // Skip the ignored position if specified
                if (ignorePosition && row === ignorePosition.row && col === ignorePosition.col) {
                    continue;
                }

                const piece = this.board[row][col].piece;
                if (piece && piece.color === opponentColor) {
                    // Use getBasicMoves to avoid recursion
                    const moves = this.getBasicMoves(piece);
                    if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    hasLegalMoves(kingColor) {
        for (let row = 0; row < this.boardSize.rows; row++) {
            for (let col = 0; col < this.rowLengths[row]; col++) {
                if (!this.board[row] || !this.board[row][col]) continue;
                const piece = this.board[row][col].piece;
                if (piece && piece.color === kingColor) {
                    const moves = this.getBasicMoves(piece);

                    // Try each possible move
                    for (const move of moves) {
                        // Save current board state
                        const originalPos = {
                            ...piece.boardPos
                        };
                        const targetPiece = this.board[move.row][move.col].piece;

                        // Make the move
                        this.board[originalPos.row][originalPos.col].piece = null;
                        this.board[move.row][move.col].piece = piece;
                        piece.boardPos = {
                            row: move.row,
                            col: move.col
                        };

                        // Check if this move is legal
                        const inCheck = this.isKingInCheck(kingColor);

                        // Restore the board state
                        this.board[originalPos.row][originalPos.col].piece = piece;
                        this.board[move.row][move.col].piece = targetPiece;
                        piece.boardPos = originalPos;

                        if (!inCheck) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    isCheckmate(kingColor) {
        // First verify the king is in check
        if (!this.isKingInCheck(kingColor)) return false;
        // Check if any piece of the same color has valid moves that can prevent check
        for (let row = 0; row < this.boardSize.rows; row++) {
            for (let col = 0; col < this.rowLengths[row]; col++) {
                if (!this.board[row] || !this.board[row][col]) continue;
                const piece = this.board[row][col].piece;
                if (piece && piece.color === kingColor) {
                    const moves = this.getBasicMoves(piece);

                    // Try each possible move
                    for (const move of moves) {
                        // Save current board state
                        const originalPos = {
                            ...piece.boardPos
                        };
                        const targetPiece = this.board[move.row][move.col].piece;

                        // Make the move
                        this.board[originalPos.row][originalPos.col].piece = null;
                        this.board[move.row][move.col].piece = piece;
                        piece.boardPos = {
                            row: move.row,
                            col: move.col
                        };

                        // Check if this move prevents check
                        const stillInCheck = this.isKingInCheck(kingColor);

                        // Restore the board state
                        this.board[originalPos.row][originalPos.col].piece = piece;
                        this.board[move.row][move.col].piece = targetPiece;
                        piece.boardPos = originalPos;

                        // If any move prevents check, it's not checkmate
                        if (!stillInCheck) {
                            return false;
                        }
                    }
                }
            }
        }

        // If no moves prevent check, it's checkmate
        return true;
    }
    updateGameStatus() {
        const currentKingColor = this.currentTurn;

        if (this.isKingInCheck(currentKingColor)) {
            if (this.isCheckmate(currentKingColor)) {
                const winner = currentKingColor === 'White' ? 'Black' : 'White';
                this.statusText.setText(`Checkmate. ${winner} wins.`);
                this.gameOver = true;
            } else {
                this.statusText.setText(`${currentKingColor} is in check.`);
            }
        } else if (!this.hasLegalMoves(currentKingColor)) {
            this.statusText.setText('Stalemate. Game is a draw.');
            this.gameOver = true;
        } else {
            this.statusText.setText(`${this.currentTurn}'s turn`);
        }
    }
}

const config_3 = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    scene: Example_3
};

window.phaserGame = new Phaser.Game(config_3);
