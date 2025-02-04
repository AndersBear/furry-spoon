class SimpleGame extends Phaser.Scene {
    constructor() {
        super();
        this.dice1 = null;
        this.placeBetText = null;
        this.computerPlaceBetText = null;
        this.hasPlayerBet = false;
        this.hasComputerBet = false;
        this.dice2 = null;
        this.dice1Dots = [];
        this.dice2Dots = [];
        this.computerDice1 = null;
        this.computerDice2 = null;
        this.computerDice3 = null;
        this.computerDice1Dots = [];
        this.computerDice2Dots = [];
        this.computerDice3Dots = [];
        this.computerButton = null;
        this.playerButton = null;
        this.computerSumText = null;
        this.playerSumText = null;
        this.selectedPlayerSquare = null;
        this.selectedComputerSquare = null;
        this.playerWinText = null;
        this.computerWinText = null;
        this.selectedPlayerValue = null;
        this.selectedComputerValue = null;
    }

    create() {
        // Set green background
        this.cameras.main.setBackgroundColor('#006400');
        // Create first die
        this.dice1 = this.add.rectangle(300, 450, 100, 100, 0xFFFF00);
        this.dice1.setStrokeStyle(2, 0x0000FF);
        // Create second die
        this.dice2 = this.add.rectangle(500, 450, 100, 100, 0xFFFF00);
        this.dice2.setStrokeStyle(2, 0x0000FF);
        // Initialize dice with random values
        const playerValue1 = Phaser.Math.Between(1, 6);
        const playerValue2 = Phaser.Math.Between(1, 6);
        this.setDiceValue(this.dice1, this.dice1Dots, 300, 450, playerValue1);
        this.setDiceValue(this.dice2, this.dice2Dots, 500, 450, playerValue2);
        // Create computer's first die (purple with pink dots)
        // Calculate center positions for three dice
        const diceWidth = 100;
        const spacing = 20;
        const diceTotalWidth = (diceWidth * 3) + (spacing * 2);
        const startX = 400 - (diceTotalWidth / 2) + (diceWidth / 2);

        // Create computer's dice centered on screen
        this.computerDice1 = this.add.rectangle(startX, 150, 100, 100, 0x800080);
        this.computerDice1.setStrokeStyle(2, 0xFFA500);
        // Create computer's second die
        this.computerDice2 = this.add.rectangle(startX + diceWidth + spacing, 150, 100, 100, 0x800080);
        this.computerDice2.setStrokeStyle(2, 0xFFA500);
        // Create computer's third die
        this.computerDice3 = this.add.rectangle(startX + (diceWidth + spacing) * 2, 150, 100, 100, 0x800080);
        this.computerDice3.setStrokeStyle(2, 0xFFA500);
        // Initialize computer dice with random values
        const computerValue1 = Phaser.Math.Between(1, 6);
        const computerValue2 = Phaser.Math.Between(1, 6);
        const computerValue3 = Phaser.Math.Between(1, 6);
        this.setDiceValue(this.computerDice1, this.computerDice1Dots, startX, 150, computerValue1, 0xFF69B4);
        this.setDiceValue(this.computerDice2, this.computerDice2Dots, startX + diceWidth + spacing, 150, computerValue2, 0xFF69B4);
        this.setDiceValue(this.computerDice3, this.computerDice3Dots, startX + (diceWidth + spacing) * 2, 150, computerValue3, 0xFF69B4);
        // Add small squares with text values
        const squareValues = ['3, 18', '4, 17', '5, 16', '6, 15', '7, 14', '8, 13', '9, 12', '10, 11'];
        const squareWidth = 60;
        const squareSpacing = 20;
        // Calculate total width of all squares and spacing
        const squaresTotalWidth = (squareWidth * squareValues.length) + (squareSpacing * (squareValues.length - 1));
        // Center point is at 400 (between dice at 300 and 500)
        const squaresStartX = 400 - (squaresTotalWidth / 2) + (squareWidth / 2);

        // Add "Bet: " text
        this.add.text(10, 250, 'Bet:', {
            fontSize: '24px',
            color: '#FFA500',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        squareValues.forEach((value, index) => {
            // Create square
            const square = this.add.rectangle(
                squaresStartX + (squareWidth + squareSpacing) * index,
                250,
                squareWidth,
                squareWidth,
                0x800080
            );
            square.setStrokeStyle(2, 0xFFA500);
            square.setInteractive({
                useHandCursor: false
            });
            // Add click handler for computer squares
            square.on('pointerdown', () => {
                // Deselect previously selected square
                if (this.selectedComputerSquare) {
                    this.selectedComputerSquare.setStrokeStyle(2, 0xFFA500);
                }
                // Select new square
                square.setStrokeStyle(4, 0xFFFFFF);
                this.selectedComputerSquare = square;
                this.selectedComputerValue = parseInt(value.split(',')[0]);
                this.hasComputerBet = true;
                if (this.computerPlaceBetText) {
                    this.computerPlaceBetText.destroy();
                    this.computerPlaceBetText = null;
                }
            });
            // Add text
            this.add.text(
                squaresStartX + (squareWidth + squareSpacing) * index,
                250,
                value, {
                    fontSize: '16px',
                    color: '#FFA500',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);
        });

        // Add horizontal line between computer and player squares
        const line = this.add.graphics();
        line.lineStyle(4, 0x000000);
        line.beginPath();
        line.moveTo(0, 300);
        line.lineTo(800, 300);
        line.strokePath();

        // Add equal signs and sum displays
        this.add.text(600, 150, '=', {
            fontSize: '32px',
            color: '#FFA500'
        }).setOrigin(0.5);

        this.computerSumText = this.add.text(650, 150, (computerValue1 + computerValue2 + computerValue3).toString(), {
            fontSize: '32px',
            color: '#FFA500',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(600, 450, '=', {
            fontSize: '32px',
            color: '#FFFF00'
        }).setOrigin(0.5);

        // Add "Bet: " text for player
        this.add.text(130, 350, 'Bet:', {
            fontSize: '24px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        // Add small squares with text values for player
        const playerSquareValues = ['2, 12', '3, 11', '4, 10', '5, 9', '6, 8', '7'];
        const playerSquareWidth = 60;
        const playerSquareSpacing = 20;
        const playerTotalWidth = (playerSquareWidth * playerSquareValues.length) + (playerSquareSpacing * (playerSquareValues.length - 1));
        const playerStartX = 400 - (playerTotalWidth / 2) + (playerSquareWidth / 2);
        playerSquareValues.forEach((value, index) => {
            // Create square
            const square = this.add.rectangle(
                playerStartX + (playerSquareWidth + playerSquareSpacing) * index,
                350,
                playerSquareWidth,
                playerSquareWidth,
                0xFFFF00
            );
            square.setStrokeStyle(2, 0x0000FF);
            square.setInteractive({
                useHandCursor: false
            });
            // Add click handler for player squares
            square.on('pointerdown', () => {
                // Deselect previously selected square
                if (this.selectedPlayerSquare) {
                    this.selectedPlayerSquare.setStrokeStyle(2, 0x0000FF);
                }
                // Select new square
                square.setStrokeStyle(4, 0xFFFFFF);
                this.selectedPlayerSquare = square;
                this.selectedPlayerValue = parseInt(value.split(',')[0]);
                this.hasPlayerBet = true;
                if (this.placeBetText) {
                    this.placeBetText.destroy();
                    this.placeBetText = null;
                }
            });
            // Add text
            this.add.text(
                playerStartX + (playerSquareWidth + playerSquareSpacing) * index,
                350,
                value, {
                    fontSize: '16px',
                    color: '#0000FF',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);
        });
        this.playerSumText = this.add.text(650, 450, (playerValue1 + playerValue2).toString(), {
            fontSize: '48px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        // Create Computer's Roll button
        this.computerButton = this.add.rectangle(400, 50, 120, 40, 0x800080);
        this.computerButton.setStrokeStyle(2, 0xFFA500);
        this.computerButton.setInteractive();
        const computerText = this.add.text(400, 50, 'ROLL', {
            fontSize: '24px',
            color: '#FFA500'
        }).setOrigin(0.5);
        // Create Player's Roll button and Place bet text
        this.playerButton = this.add.rectangle(400, 550, 120, 40, 0xFFFF00);
        this.playerButton.setStrokeStyle(2, 0x0000FF);
        this.playerButton.setInteractive();
        const playerText = this.add.text(400, 550, 'ROLL', {
            fontSize: '24px',
            color: '#0000FF'
        }).setOrigin(0.5);
        // Add win text objects
        this.computerWinText = this.add.text(540, 50, '', {
            fontSize: '24px',
            color: '#FFA500',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        this.playerWinText = this.add.text(540, 550, '', {
            fontSize: '24px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        // Create initial "Place bet" texts
        this.placeBetText = this.add.text(530, 550, 'Place bet', {
            fontSize: '24px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        this.computerPlaceBetText = this.add.text(530, 50, 'Place bet', {
            fontSize: '24px',
            color: '#FFA500',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        // Add click handlers
        this.computerButton.on('pointerdown', () => {
            if (!this.selectedComputerSquare) {
                // Flash the button red and show "Place bet" message
                this.computerButton.setFillStyle(0xFF0000);
                // Make sure "Place bet" text is visible
                if (!this.computerPlaceBetText) {
                    this.computerPlaceBetText = this.add.text(530, 50, 'Place bet', {
                        fontSize: '24px',
                        color: '#FFA500',
                        fontStyle: 'bold'
                    }).setOrigin(0, 0.5);
                }
                setTimeout(() => {
                    this.computerButton.setFillStyle(0x800080);
                }, 2000);
                return;
            }
            // Generate weighted roll values based on odds
            const roll = this.getWeightedRoll();
            const [value1, value2, value3] = roll;
            const diceWidth = 100;
            const spacing = 20;
            const diceTotalWidth = (diceWidth * 3) + (spacing * 2);
            const startX = 400 - (diceTotalWidth / 2) + (diceWidth / 2);

            this.setDiceValue(this.computerDice1, this.computerDice1Dots, startX, 150, value1, 0xFF69B4);
            this.setDiceValue(this.computerDice2, this.computerDice2Dots, startX + diceWidth + spacing, 150, value2, 0xFF69B4);
            this.setDiceValue(this.computerDice3, this.computerDice3Dots, startX + (diceWidth + spacing) * 2, 150, value3, 0xFF69B4);
            const sum = value1 + value2 + value3;
            this.computerSumText.setText(sum.toString());
            // Get the full bet value string
            const selectedBetString = this.selectedComputerSquare ?
                squareValues[squareValues.findIndex(val =>
                    parseInt(val.split(',')[0]) === this.selectedComputerValue)] : '';
            // Check if sum matches either number in the selected value
            const [num1, num2] = selectedBetString.split(',').map(num => parseInt(num.trim()));

            // Determine win/loss based on odds
            switch (true) {
                case ((sum === 3 || sum === 18) && selectedBetString === '3, 18'):
                    this.computerWinText.setText('Win 8');
                    break;
                case ((sum === 4 || sum === 17) && selectedBetString === '4, 17'):
                    this.computerWinText.setText('Win 7');
                    break;
                case ((sum === 5 || sum === 16) && selectedBetString === '5, 16'):
                    this.computerWinText.setText('Win 6');
                    break;
                case ((sum === 6 || sum === 15) && selectedBetString === '6, 15'):
                    this.computerWinText.setText('Win 5');
                    break;
                case ((sum === 7 || sum === 14) && selectedBetString === '7, 14'):
                    this.computerWinText.setText('Win 4');
                    break;
                case ((sum === 8 || sum === 13) && selectedBetString === '8, 13'):
                    this.computerWinText.setText('Win 3');
                    break;
                case ((sum === 9 || sum === 12) && selectedBetString === '9, 12'):
                    this.computerWinText.setText('Win 2');
                    break;
                case ((sum === 10 || sum === 11) && selectedBetString === '10, 11'):
                    this.computerWinText.setText('Win 1');
                    break;
                default:
                    this.computerWinText.setText('Lose');
            }
        });
        this.playerButton.on('pointerdown', () => {
            if (!this.selectedPlayerSquare) {
                // Flash the button red and show "Place bet" message
                this.playerButton.setFillStyle(0xFF0000);
                // Make sure "Place bet" text is visible
                if (!this.placeBetText) {
                    this.placeBetText = this.add.text(530, 550, 'Place bet', {
                        fontSize: '24px',
                        color: '#FFFF00',
                        fontStyle: 'bold'
                    }).setOrigin(0, 0.5);
                }
                setTimeout(() => {
                    this.playerButton.setFillStyle(0xFFFF00);
                }, 2000);
                return;
            }
            // Generate weighted roll values based on odds
            const [value1, value2] = this.getWeightedYellowRoll();
            this.setDiceValue(this.dice1, this.dice1Dots, 300, 450, value1);
            this.setDiceValue(this.dice2, this.dice2Dots, 500, 450, value2);
            const sum = value1 + value2;
            this.playerSumText.setText(sum.toString());
            // Get the full bet value string (e.g., "2, 12")
            const selectedBetString = this.selectedPlayerSquare ?
                playerSquareValues[playerSquareValues.findIndex(val =>
                    parseInt(val.split(',')[0]) === this.selectedPlayerValue)] : '';

            switch (true) {
                case ((sum === 2 || sum === 12) && selectedBetString === '2, 12'):
                    this.playerWinText.setText('Win 6');
                    break;
                case ((sum === 3 || sum === 11) && selectedBetString === '3, 11'):
                    this.playerWinText.setText('Win 5');
                    break;
                case ((sum === 4 || sum === 10) && selectedBetString === '4, 10'):
                    this.playerWinText.setText('Win 4');
                    break;
                case ((sum === 5 || sum === 9) && selectedBetString === '5, 9'):
                    this.playerWinText.setText('Win 3');
                    break;
                case ((sum === 6 || sum === 8) && selectedBetString === '6, 8'):
                    this.playerWinText.setText('Win 2');
                    break;
                case (sum === 7 && selectedBetString === '7'):
                    this.playerWinText.setText('Win 1');
                    break;
                default:
                    this.playerWinText.setText('Lose');
            }
        });
    }
    setDiceValue(dice, dotsArray, centerX, centerY, value, dotColor = 0x0000FF) {
        // Clear existing dots
        dotsArray.forEach(dot => dot.destroy());
        dotsArray.length = 0;
        let positions = [];

        switch (value) {
            case 1:
                positions = [
                    [0, 0]
                ];
                break;
            case 2:
                positions = [
                    [-20, -20],
                    [20, 20]
                ];
                break;
            case 3:
                positions = [
                    [-20, -20],
                    [0, 0],
                    [20, 20]
                ];
                break;
            case 4:
                positions = [
                    [-20, -20],
                    [20, -20],
                    [-20, 20],
                    [20, 20]
                ];
                break;
            case 5:
                positions = [
                    [-20, -20],
                    [20, -20],
                    [0, 0],
                    [-20, 20],
                    [20, 20]
                ];
                break;
            case 6:
                positions = [
                    [-20, -20],
                    [20, -20],
                    [-20, 0],
                    [20, 0],
                    [-20, 20],
                    [20, 20]
                ];
                break;
        }

        // Create new dots based on value
        positions.forEach(pos => {
            const dot = this.add.circle(centerX + pos[0], centerY + pos[1], 8, dotColor);
            dotsArray.push(dot);
        });
    }
    getWeightedRoll() {
        const random = Math.random() * 216; // Total possible combinations

        // Define the ranges for each sum based on the given odds
        if (random < 27) { // 27/216 for 10,11
            return [4, 3, 3]; // One possible combination for 10
        } else if (random < 52) { // 25/216 for 9,12
            return [4, 4, 4]; // One possible combination for 12
        } else if (random < 73) { // 21/216 for 8,13
            return [4, 4, 5]; // One possible combination for 13
        } else if (random < 88) { // 15/216 for 7,14
            return [4, 5, 5]; // One possible combination for 14
        } else if (random < 98) { // 10/216 for 6,15
            return [5, 5, 5]; // One possible combination for 15
        } else if (random < 104) { // 6/216 for 5,16
            return [5, 5, 6]; // One possible combination for 16
        } else if (random < 107) { // 3/216 for 4,17
            return [5, 6, 6]; // One possible combination for 17
        } else if (random < 108) { // 1/216 for 3,18
            return [6, 6, 6]; // Combination for 18
        } else {
            // Default case - return a random roll that doesn't match special combinations
            return [
                Phaser.Math.Between(1, 6),
                Phaser.Math.Between(1, 6),
                Phaser.Math.Between(1, 6)
            ];
        }
    }
    getWeightedYellowRoll() {
        const random = Math.random() * 36; // Total possible combinations for 2 dice

        // Define the ranges for each sum based on the given odds
        if (random < 6) { // Highest probability for middle numbers
            return [3, 4]; // One possible combination for 7
        } else if (random < 11) { // Second highest probability
            return [4, 4]; // One possible combination for 8
        } else if (random < 15) {
            return [4, 5]; // One possible combination for 9
        } else if (random < 18) {
            return [5, 5]; // One possible combination for 10
        } else if (random < 20) {
            return [5, 6]; // One possible combination for 11
        } else if (random < 21) {
            return [6, 6]; // One possible combination for 12
        } else {
            // Default case - return a random roll that doesn't match special combinations
            return [
                Phaser.Math.Between(1, 6),
                Phaser.Math.Between(1, 6)
            ];
        }
    }
    update() {}
}

/*
const container = document.getElementById('renderDiv');
const config = {
    type: Phaser.AUTO,
    parent: container,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    scene: SimpleGame
};

window.phaserGame = new Phaser.Game(config);
*/

const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    scene: SimpleGame
};

window.phaserGame = new Phaser.Game(config);

