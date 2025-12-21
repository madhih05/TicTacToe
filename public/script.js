const socket = io();

// ============================================================================
// STATE & DOM ELEMENTS
// ============================================================================

var board = Array(9).fill(null);
var playerMarker = null;
var yourTurn = false;

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".announcement");

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const addMove = (data) => {
    board[data.index] = data.marker;
    const cell = document.getElementById(`cell-${data.index}`);
    cell.classList.add(`${data.marker}-marker`);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// EVENT HANDLERS
// ============================================================================

async function handleCellClick(clickedCellEvent) {
    if (!yourTurn) {
        return;
    }

    const clickedCell = clickedCellEvent.target;
    const clickedIndex = clickedCell.getAttribute("data-index");

    if (board[clickedIndex] !== null) {
        return;
    }

    board[clickedIndex] = playerMarker;
    clickedCell.classList.add(`${playerMarker}-marker`);
    console.log(playerMarker);

    socket.emit("player move", {
        index: clickedIndex,
        marker: playerMarker,
    });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// ============================================================================
// SOCKET LISTENERS
// ============================================================================

socket.on("game ready", (data) => {
    playerMarker = data.marker;
    console.log("You are player:", playerMarker);
    yourTurn = playerMarker === "x";
    statusDisplay.innerHTML = `You are player ${playerMarker.toUpperCase()}. ${
        yourTurn ? "Your turn!" : "Opponent's turn."
    }`;
});

socket.on("player move", (data) => {
    addMove(data);
    yourTurn = true;
    statusDisplay.innerHTML =
        "You are player " + playerMarker.toUpperCase() + ". Your turn!";
});

socket.on("move ack", (currentMove) => {
    let currentMarker = currentMove === 0 ? "x" : "o";
    yourTurn = currentMarker === playerMarker;
    statusDisplay.innerHTML = `You are player ${playerMarker.toUpperCase()}. ${
        yourTurn ? "Your turn!" : "Opponent's turn."
    }`;
});

socket.on("opponent disconnected", async () => {
    statusDisplay.innerHTML = "Opponent disconnected. You win!";
    await sleep(3000);
    window.location.reload();
});

socket.on("game won", async (data) => {
    await sleep(1000);
    if (data.winner === playerMarker) {
        statusDisplay.innerHTML = "You win!";
        statusDisplay.classList.add(`${0 === playerMarker ? "X" : "O"}-win`);
    } else {
        statusDisplay.innerHTML = "You loose!";
        statusDisplay.classList.add(`lost`);
    }
    board.fill(null);
    cells.forEach((cell) => cell.classList.remove("x-marker", "o-marker"));
    yourTurn = false;
    await sleep(3000);
    window.location.reload();
});

socket.on("game draw", async () => {
    statusDisplay.innerHTML = "It's a draw!";
    statusDisplay.classList.add("draw-win");
    board.fill(null);
    cells.forEach((cell) => cell.classList.remove("x-marker", "o-marker"));
    yourTurn = false;
    await sleep(3000);
    window.location.reload();
});
