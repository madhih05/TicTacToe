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
    }

    setMove(index) {
        if (this.board[index] !== this.EMPTY) return false;
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === this.X ? this.O : this.X;
        return true;
    }
}

// UI wiring
document.addEventListener("DOMContentLoaded", () => {
    const game = new GameBoard();
    const boardEl = document.getElementById("game-board");
    const statusEl = document.getElementById("status");
    const cells = Array.from(boardEl.querySelectorAll(".cell"));
    let gameOver = false;

    function createX() {
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.classList.add("symbol", "symbol-x");
        const line1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line1.setAttribute("x1", "20");
        line1.setAttribute("y1", "20");
        line1.setAttribute("x2", "80");
        line1.setAttribute("y2", "80");
        const line2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line2.setAttribute("x1", "80");
        line2.setAttribute("y1", "20");
        line2.setAttribute("x2", "20");
        line2.setAttribute("y2", "80");
        svg.appendChild(line1);
        svg.appendChild(line2);
        return svg;
    }

    function createO() {
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.classList.add("symbol", "symbol-o");
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "35");
        svg.appendChild(circle);
        return svg;
    }

    function renderCell(index) {
        const cell = cells[index];
        const inner = cell.querySelector("div") || cell;
        inner.innerHTML = "";
        const sym = game.board[index];
        if (sym === game.X) inner.appendChild(createX());
        else if (sym === game.O) inner.appendChild(createO());
    }

    function renderAll() {
        cells.forEach((_, i) => renderCell(i));
        updateTurn();
    }

    function updateTurn() {
        if (!gameOver) {
            const playerText = game.currentPlayer === game.X ? "X" : "O";
            statusEl.textContent = `Player ${playerText}'s turn`;
            statusEl.className = "status";
        }
    }

    function showAnnouncement(message, type) {
        statusEl.textContent = message;
        statusEl.className = "status " + type;
    }

    function resetGame() {
        game.board = new Array(9).fill(game.EMPTY);
        game.currentPlayer = game.X;
        gameOver = false;
        renderAll();
    }

    const checkWin = () => {
        for (let i = 0; i < game.winConditions.length; i++) {
            const [a, b, c] = game.winConditions[i];
            const sum = game.board[a] + game.board[b] + game.board[c];
            if (sum === 3) return 1; // X wins
            if (sum === -3) return -1; // O wins
        }
        // Check for draw
        if (!game.board.includes(game.EMPTY)) return 2;
        return 0;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameOver) return;
            const moved = game.setMove(index);
            if (moved) {
                renderCell(index);
                updateTurn();
            }
            const winner = checkWin();
            if (winner === 1) {
                gameOver = true;
                showAnnouncement("🎉 Player X wins!", "winner-x");
            } else if (winner === -1) {
                gameOver = true;
                showAnnouncement("🎉 Player O wins!", "winner-o");
            } else if (winner === 2) {
                gameOver = true;
                showAnnouncement("It's a draw!", "draw");
            }
            if (gameOver) {
                setTimeout(resetGame, 2500);
            }
        });
    });

    renderAll();
});
