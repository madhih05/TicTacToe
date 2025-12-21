const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

class GameBoard {
    constructor(x, o) {
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
        this.xPlayer = x;
        this.oPlayer = o;
        this.winner = null;
    }

    switchplayer = () => {
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
        if (winner === this.X) return "X";
        if (winner === this.O) return "O";
        if (this.isDraw()) return "draw";
        return false;
    };

    boardReset = () => {
        this.board.fill(this.EMPTY);
        this.currentPlayer = this.X;
    };
}

let rooms = {}; // has 2 values in each an array of players called players, and a room id number called roomId

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    roomID = null;
    for (let id in rooms) {
        if (rooms[id].players.length === 1) {
            roomID = rooms[id].roomId;
            rooms[id].players.push(socket.id);
            socket.join(roomID);
            io.to(roomID).emit("start game", { roomId: roomID });
            game = new GameBoard(rooms[id].players[0], rooms[id].players[1]);
            rooms[id].game = game;
            console.log(rooms);
            break;
        }
        break;
    }
    if (roomID === null) {
        roomID = `room-${socket.id}`;
        rooms[roomID] = {
            roomId: roomID,
            players: [socket.id],
            game: null,
        };
        socket.join(roomID);
    }
});

io.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    // Handle user disconnection logic here
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
