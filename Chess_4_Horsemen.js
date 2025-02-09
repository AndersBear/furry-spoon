class FourHorsemen extends Phaser.Scene {
    constructor() {
        super();
        this.boardHeight = 4;
        this.boardWidth = 6;
        this.cellSize = 80;
        this.offsetX = 240; // Center the board
        this.offsetY = 120;
        this.selectedPiece = null;
        this.board = [];
        this.isPlayer1Turn = true; // true for player1 (horses), false for player2 (rook/bishop)
        this.validMoveHighlights = [];
        this.turnText = null;
        this.gameOver = false;
        this.statusText = null;
    }

    create() {
        // Set the background color to black
        this.cameras.main.setBackgroundColor('#404040');
        // Create the chess board
        this.createBoard();
        // Initialize the game pieces
        this.initializePieces();
        // Add click handling
        this.input.on('gameobjectdown', this.onPieceClick, this);
        // Add turn display text
        this.turnText = this.add.text(400, 50, '', {
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        this.updateTurnText();
        // Add status text for check/checkmate/stalemate
        this.statusText = this.add.text(400, 500, '', {
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    }
    createBoard() {
        // Create the 5x5 board
        for (let row = 0; row < this.boardHeight; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.boardWidth; col++) {
                const x = this.offsetX + col * this.cellSize;
                const y = this.offsetY + row * this.cellSize;

                // Create cell background
                const cell = this.add.rectangle(x, y, this.cellSize, this.cellSize,
                    (row + col) % 2 === 0 ? 0xFFD700 : 0x00008B);
                cell.setOrigin(0);
                cell.setInteractive();
                cell.row = row;
                cell.col = col;

                // Add click handler for the cell
                cell.on('pointerdown', () => {
                    if (this.selectedPiece && this.isValidMove(this.selectedPiece.row, this.selectedPiece.col, row, col)) {
                        // Move the piece
                        const startRow = this.selectedPiece.row;
                        const startCol = this.selectedPiece.col;

                        // Capture if there's a piece
                        if (this.board[row][col].piece) {
                            this.board[row][col].text.destroy();
                        }

                        // Update board array
                        this.board[row][col].piece = this.selectedPiece.pieceType;
                        this.board[row][col].text = this.selectedPiece;
                        this.board[startRow][startCol].piece = null;
                        this.board[startRow][startCol].text = null;

                        // Update piece position
                        const newX = this.offsetX + col * this.cellSize + this.cellSize / 2;
                        const newY = this.offsetY + row * this.cellSize + this.cellSize / 2;
                        this.selectedPiece.x = newX;
                        this.selectedPiece.y = newY;
                        this.selectedPiece.row = row;
                        this.selectedPiece.col = col;

                        // Reset selection and switch turns
                        this.selectedPiece.setStyle({
                            color: this.selectedPiece.isPlayer1 ? '#FF0000' : '#006400'
                        });
                        this.selectedPiece = null;
                        this.isPlayer1Turn = !this.isPlayer1Turn;
                        this.updateTurnText();
                        this.clearValidMoveHighlights();
                        this.checkGameState();
                    }
                });
                // Initialize board array
                this.board[row][col] = {
                    piece: null,
                    text: null
                };
            }
        }
    }
    initializePieces() {
        // Player 1 pieces (top)
        this.placePiece(0, 0, 'K', true); // King
        this.placePiece(0, 4, 'Q', true); // Queen 1
        this.placePiece(0, 5, 'Q', true); // Queen 2
        // Player 2 pieces (bottom)
        this.placePiece(3, 0, 'K', false); // King
        this.placePiece(3, 1, 'H', false); // Horse 1
        this.placePiece(3, 2, 'H', false); // Horse 2
        this.placePiece(3, 3, 'H', false); // Horse 3
        this.placePiece(3, 4, 'H', false); // Horse 4
    }
    placePiece(row, col, pieceType, isPlayer1) {
        const x = this.offsetX + col * this.cellSize + this.cellSize / 2;
        const y = this.offsetY + row * this.cellSize + this.cellSize / 2;

        const text = this.add.text(x, y, pieceType, {
            fontFamily: 'Arial',
            fontSize: isPlayer1 ? '45px' : 'bold 40px',
            color: isPlayer1 ? '#FF3333' : '#006400'
        }).setOrigin(0.5);

        text.setInteractive();
        text.row = row;
        text.col = col;
        text.pieceType = pieceType;
        text.isPlayer1 = isPlayer1;

        this.board[row][col].piece = pieceType;
        this.board[row][col].text = text;
    }
    onPieceClick(pointer, gameObject) {
        // Clear previous highlights
        this.clearValidMoveHighlights();
        // If clicking the same piece, deselect it
        if (this.selectedPiece === gameObject) {
            this.selectedPiece.setStyle({
                color: this.selectedPiece.isPlayer1 ? '#FF0000' : '#006400'
            });
            this.selectedPiece = null;
            return;
        }
        // If it's a new piece selection
        if (!this.selectedPiece) {
            if (gameObject.isPlayer1 === this.isPlayer1Turn) {
                this.selectedPiece = gameObject;
                gameObject.setStyle({
                    color: '#006400'
                }); // Highlight selected piece
                this.showValidMoves(gameObject.row, gameObject.col);
            }
        } else {
            const currentSelection = this.selectedPiece;
            // If clicking another piece while one is selected
            if (gameObject.isPlayer1 === currentSelection.isPlayer1) {
                // Switch selection to the new piece
                currentSelection.setStyle({
                    color: currentSelection.isPlayer1 ? '#FF0000' : '#006400'
                });
                this.selectedPiece = gameObject;
                gameObject.setStyle({
                    color: '#006400'
                });
                this.showValidMoves(gameObject.row, gameObject.col);
            } else if (this.isValidMove(currentSelection.row, currentSelection.col, gameObject.row, gameObject.col)) {
                // Capture enemy piece
                gameObject.destroy();
                // Move selected piece
                const startRow = currentSelection.row;
                const startCol = currentSelection.col;
                const targetRow = gameObject.row;
                const targetCol = gameObject.col;
                this.board[targetRow][targetCol].piece = currentSelection.pieceType;
                this.board[targetRow][targetCol].text = currentSelection;
                this.board[startRow][startCol].piece = null;
                this.board[startRow][startCol].text = null;
                const newX = this.offsetX + targetCol * this.cellSize + this.cellSize / 2;
                const newY = this.offsetY + targetRow * this.cellSize + this.cellSize / 2;
                currentSelection.x = newX;
                currentSelection.y = newY;
                currentSelection.row = targetRow;
                currentSelection.col = targetCol;
                currentSelection.setStyle({
                    color: currentSelection.isPlayer1 ? '#FF0000' : '#006400'
                });
                this.selectedPiece = null;
                this.isPlayer1Turn = !this.isPlayer1Turn;
                this.updateTurnText();
                this.checkGameState();
            } else {
                // Reset selection if the move was invalid
                currentSelection.setStyle({
                    color: currentSelection.isPlayer1 ? '#FF0000' : '#006400'
                });
                this.selectedPiece = null;
            }
        }
    }
    showValidMoves(startRow, startCol) {
        const piece = this.board[startRow][startCol].piece;
        const isPlayer1 = this.board[startRow][startCol].text?.isPlayer1;
        // Temp store the selected piece to maintain context during validation
        const originalSelected = this.selectedPiece;
        if (!this.selectedPiece) {
            this.selectedPiece = {
                pieceType: piece,
                isPlayer1: isPlayer1
            };
        }
        if (piece === 'H') {
            // All possible L-shaped moves for knights
            const knightMoves = [
                [-2, -1],
                [-2, 1], // Two up, one left/right
                [2, -1],
                [2, 1], // Two down, one left/right
                [-1, -2],
                [1, -2], // One up/down, two left
                [-1, 2],
                [1, 2] // One up/down, two right
            ];
            knightMoves.forEach(([rowOffset, colOffset]) => {
                const newRow = startRow + rowOffset;
                const newCol = startCol + colOffset;
                // Check if the move is within board bounds and valid
                if (newRow >= 0 && newRow < this.boardHeight &&
                    newCol >= 0 && newCol < this.boardWidth &&
                    this.isValidMove(startRow, startCol, newRow, newCol) &&
                    !this.wouldBeInCheck(startRow, startCol, newRow, newCol, isPlayer1)) {

                    const x = this.offsetX + newCol * this.cellSize;
                    const y = this.offsetY + newRow * this.cellSize;

                    // Create highlight rectangle
                    const highlight = this.add.rectangle(
                        x + this.cellSize / 2,
                        y + this.cellSize / 2,
                        this.cellSize - 10,
                        this.cellSize - 10,
                        0x00FF00,
                        0.3
                    );
                    this.validMoveHighlights.push(highlight);
                }
            });
        } else {
            // Logic for other pieces (King, Rook, Bishop)
            for (let row = 0; row < this.boardHeight; row++) {
                for (let col = 0; col < this.boardWidth; col++) {
                    if (this.isValidMove(startRow, startCol, row, col) &&
                        !this.wouldBeInCheck(startRow, startCol, row, col, isPlayer1)) {
                        const x = this.offsetX + col * this.cellSize;
                        const y = this.offsetY + row * this.cellSize;
                        // Create highlight rectangle
                        const highlight = this.add.rectangle(
                            x + this.cellSize / 2,
                            y + this.cellSize / 2,
                            this.cellSize - 10,
                            this.cellSize - 10,
                            0x00FF00,
                            0.3
                        );
                        this.validMoveHighlights.push(highlight);
                    }
                }
            }
        }

        // Restore the original selected piece
        this.selectedPiece = originalSelected;
    }
    clearValidMoveHighlights() {
        this.validMoveHighlights.forEach(highlight => highlight.destroy());
        this.validMoveHighlights = [];
    }
    updateTurnText() {
        const currentPlayer = this.isPlayer1Turn ? "Red's" : "Green's";
        this.turnText.setText(`${currentPlayer} Turn`);
        this.turnText.setColor('#FFFFFF');
    }
    isValidMove(startRow, startCol, targetRow, targetCol, checkForCheck = true) {
        // Can't move to the same square
        if (startRow === targetRow && startCol === targetCol) {
            return false;
        }
        if (this.gameOver) {
            return false;
        }
        // Get the piece at the start position
        const startCell = this.board[startRow][startCol];
        if (!startCell || !startCell.piece) {
            return false;
        }
        const piece = startCell.piece;
        const isPlayer1 = startCell.text?.isPlayer1;
        const targetPiece = this.board[targetRow][targetCol].text;
        // Can't capture your own pieces
        if (targetPiece && targetPiece.isPlayer1 === isPlayer1) {
            return false;
        }
        switch (piece) {
            case 'Q': // Queen - moves any number of squares horizontally, vertically, or diagonally
                const rowDiffQ = Math.abs(targetRow - startRow);
                const colDiffQ = Math.abs(targetCol - startCol);
                if (rowDiffQ === colDiffQ || startRow === targetRow || startCol === targetCol) {
                    return this.isPathClear(startRow, startCol, targetRow, targetCol);
                }
                return false;
            case 'K': // King - moves one square in any direction
                const rowDiffK = Math.abs(targetRow - startRow);
                const colDiffK = Math.abs(targetCol - startCol);
                if (rowDiffK <= 1 && colDiffK <= 1 && !(rowDiffK === 0 && colDiffK === 0)) {
                    // Check if the target square is empty or contains an enemy piece
                    const targetCell = this.board[targetRow][targetCol];
                    return !targetCell.piece || (targetCell.text?.isPlayer1 !== isPlayer1);
                }
                return false;

            case 'H': // Horse (Knight) - L-shaped movement
                const rowDiffH = Math.abs(targetRow - startRow);
                const colDiffH = Math.abs(targetCol - startCol);
                const isValidKnightMove = (rowDiffH === 2 && colDiffH === 1) || (rowDiffH === 1 && colDiffH === 2);

                if (isValidKnightMove) {
                    // Check if the target square is empty or contains an enemy piece
                    const targetCell = this.board[targetRow][targetCol];
                    return !targetCell.piece || (targetCell.text?.isPlayer1 !== isPlayer1);
                }
                return false;

            case 'R': // Rook - moves any number of squares horizontally or vertically
                if (startRow !== targetRow && startCol !== targetCol) {
                    return false; // Must move either horizontally or vertically
                }
                return this.isPathClear(startRow, startCol, targetRow, targetCol);

            case 'B': // Bishop - moves any number of squares diagonally
                if (Math.abs(targetRow - startRow) !== Math.abs(targetCol - startCol)) {
                    return false; // Must move diagonally
                }
                return this.isPathClear(startRow, startCol, targetRow, targetCol);
        }
        return false;
    }
    // Check if a move would put or leave own king in check
    wouldBeInCheck(startRow, startCol, targetRow, targetCol, isPlayer1) {
        // Save the complete original state
        const originalStartPiece = this.board[startRow][startCol].piece;
        const originalStartText = this.board[startRow][startCol].text;
        const originalTargetPiece = this.board[targetRow][targetCol].piece;
        const originalTargetText = this.board[targetRow][targetCol].text;

        // Update board state temporarily
        this.board[targetRow][targetCol].piece = originalStartPiece;
        this.board[targetRow][targetCol].text = originalStartText;
        this.board[startRow][startCol].piece = null;
        this.board[startRow][startCol].text = null;

        // Find king's position
        let kingRow, kingCol;
        if (originalStartPiece === 'K') {
            kingRow = targetRow;
            kingCol = targetCol;
        } else {
            const kingPos = this.findKing(isPlayer1);
            kingRow = kingPos.row;
            kingCol = kingPos.col;
        }

        // Check if any opponent piece can capture the king
        const inCheck = this.isKingInCheck(kingRow, kingCol, isPlayer1);

        // Restore the complete board state
        this.board[startRow][startCol].piece = originalStartPiece;
        this.board[startRow][startCol].text = originalStartText;
        this.board[targetRow][targetCol].piece = originalTargetPiece;
        this.board[targetRow][targetCol].text = originalTargetText;

        return inCheck;
    }
    isKingInCheck(kingRow, kingCol, isPlayer1) {
        // Save the current selected piece
        const originalSelected = this.selectedPiece;

        // Check all opponent pieces
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const cell = this.board[row][col];
                if (!cell || !cell.piece) continue;

                // Only check opponent pieces
                if (cell.text?.isPlayer1 === isPlayer1) continue;

                // Create temporary piece context
                this.selectedPiece = {
                    pieceType: cell.piece,
                    isPlayer1: cell.text?.isPlayer1,
                    row: row,
                    col: col
                };

                // Check if this piece can attack the king's position
                const canAttackKing = this.isValidMove(row, col, kingRow, kingCol, false);

                if (canAttackKing) {
                    this.selectedPiece = originalSelected;
                    return true;
                }
            }
        }

        // Restore the original selected piece
        this.selectedPiece = originalSelected;
        return false;
    }
    hasValidMoves(isPlayer1) {
        for (let startRow = 0; startRow < this.boardHeight; startRow++) {
            for (let startCol = 0; startCol < this.boardWidth; startCol++) {
                const piece = this.board[startRow][startCol];
                if (piece.piece && piece.text?.isPlayer1 === isPlayer1) {
                    for (let targetRow = 0; targetRow < this.boardHeight; targetRow++) {
                        for (let targetCol = 0; targetCol < this.boardWidth; targetCol++) {
                            if (this.isValidMove(startRow, startCol, targetRow, targetCol)) {
                                if (!this.wouldBeInCheck(startRow, startCol, targetRow, targetCol, isPlayer1)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    checkGameState() {
        const currentPlayer = this.isPlayer1Turn;
        const kingPos = this.findKing(currentPlayer);

        if (this.isKingInCheck(kingPos.row, kingPos.col, currentPlayer)) {
            if (!this.hasValidMoves(currentPlayer)) {
                // Checkmate
                this.gameOver = true;
                this.statusText.setText(`Checkmate! ${currentPlayer ? "Green" : "Red"} wins!`);
                this.statusText.setColor('#FFFFFF');
            } else {
                this.statusText.setText(`${currentPlayer ? "Red" : "Green"} is in Check!`);
                this.statusText.setColor('#FFFFFF');
            }
        } else if (!this.hasValidMoves(currentPlayer)) {
            // Stalemate
            this.gameOver = true;
            this.statusText.setText('Stalemate! Game is a draw.');
            this.statusText.setColor('#FFFFFF');
        } else {
            this.statusText.setText('');
        }
    }
    findKing(isPlayer1) {
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const cell = this.board[row][col];
                if (cell.piece === 'K' && cell.text?.isPlayer1 === isPlayer1) {
                    return {
                        row,
                        col
                    };
                }
            }
        }
    }
    isPathClear(startRow, startCol, targetRow, targetCol) {
        const rowDir = targetRow > startRow ? 1 : targetRow < startRow ? -1 : 0;
        const colDir = targetCol > startCol ? 1 : targetCol < startCol ? -1 : 0;

        // For straight lines (rook)
        if (rowDir === 0 || colDir === 0) {
            let row = startRow + rowDir;
            let col = startCol + colDir;
            while (row !== targetRow || col !== targetCol) {
                if (this.board[row][col].piece) {
                    return false;
                }
                row += rowDir;
                col += colDir;
            }
            return true;
        }

        // For diagonal movement (bishop)
        let row = startRow + rowDir;
        let col = startCol + colDir;
        while (row !== targetRow && col !== targetCol) {
            if (this.board[row][col].piece) {
                return false;
            }
            row += rowDir;
            col += colDir;
        }
        return true;
    }
}

const configga = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    scene: FourHorsemen
};

window.phaserGame = new Phaser.Game(configga);
