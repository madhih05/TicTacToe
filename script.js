class GameBoard {
    constructor() {
        this.X = 1; // Represent X with 1
        this.O = -1; // Represent O with -1
        this.EMPTY = 0; // Represent empty cell with 0
        this.board = new Array(9).fill(this.EMPTY); // 3x3 board represented as a flat array
        this.winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]; // Winning combinations
        this.currentPlayer = this.X; // X starts first
        this.gameActive = true;
    }

    switchplayer = (player) => {
        this.currentPlayer = this.currentPlayer === this.X ? this.O : this.X;
    };

    switchStatus = () => {
        this.gameActive = !this.gameActive;
    };

    checkWin = () => {
        for (let condition of this.winConditions) {
            const sum =
                this.board[condition[0]] +
                this.board[condition[1]] +
                this.board[condition[2]];
            switch (sum) {
                case 3:
                    return this.X; // X wins
                case -3:
                    return this.O; // O wins
            }
        }
    };

    isDraw = () => {
        return this.board.includes(this.EMPTY) === false;
    };

    whoWin = () => {
        const winner = this.checkWin();
        switch (winner) {
            case this.X:
                this.switchStatus();
                return "X";
            case this.O:
                this.switchStatus();
                return "O";
            default:
                if (this.isDraw()) {
                    this.switchStatus();
                    return "draw";
                }
                return false;
        }
    };

    boardReset = () => {
        this.board.fill(this.EMPTY);
        this.currentPlayer = this.X;
    };
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".announcement");
game = new GameBoard();

const cellReset = async () => {
    await sleep(2000);
    game.boardReset();
    cells.forEach((cell) => (cell.innerText = ""));
    statusDisplay.innerText = "New Game! Player X starts.";
    game.switchStatus();
};

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedIndex = clickedCell.getAttribute("data-index");

    if (game.board[clickedIndex] === game.EMPTY && game.gameActive) {
        clickedCell.innerText = game.currentPlayer === game.X ? "X" : "O";
        game.board[clickedIndex] = game.currentPlayer;
        const result = game.whoWin();
        if (result) {
            switch (result) {
                case "X":
                    statusDisplay.innerText = "Player X has won!";
                    cellReset();
                    break;
                case "O":
                    statusDisplay.innerText = "Player O has won!";
                    cellReset();
                    break;
                case "draw":
                    statusDisplay.innerText = "Game ended in a draw!";
                    cellReset();
                    break;
            }
        } else {
            game.switchplayer();
            statusDisplay.innerText = `Player ${
                game.currentPlayer === game.X ? "O" : "X"
            }'s turn`;
        }
        console.log(game.board);
    }
}
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
