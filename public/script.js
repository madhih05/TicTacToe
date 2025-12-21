const socket = io();

const joinGame = () => {
    socket.emit("join game");
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".announcement");
const game = new GameBoard();

const cellReset = async (waitTime) => {
    await sleep(waitTime);
    game.boardReset();
    // cells.forEach((cell) => (cell.innerText = ""));
    cells.forEach((cell) => {
        cell.classList.remove("x-marker", "o-marker");
    });
    statusDisplay.innerText = "Player X starts.";
    game.gameActive = true;
};
joinGame();
async function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedIndex = clickedCell.getAttribute("data-index");

    if (game.board[clickedIndex] === game.EMPTY && game.gameActive) {
        // clickedCell.innerText = game.currentPlayer === game.X ? "X" : "O";
        clickedCell.classList.add(
            `${game.currentPlayer === game.X ? "x" : "o"}-marker`
        );
        game.board[clickedIndex] = game.currentPlayer;
        const result = game.whoWin();
        if (result) {
            game.switchStatus();
            const messages = {
                X: "Player X has won!",
                O: "Player O has won!",
                draw: "Game ended in a draw!",
            };
            statusDisplay.innerText = messages[result];
            statusDisplay.classList.add(`${result}-win`);
            await cellReset(2000);
            statusDisplay.classList.remove(`${result}-win`);
        } else {
            game.switchplayer();
            statusDisplay.innerText = `Player ${
                game.currentPlayer === game.X ? "X" : "O"
            }'s turn`;
        }
    }
}
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
