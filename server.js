const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

let rooms = {};
// has 2 values in each an array of players called players,
// and a room id number called roomId

checkWin = (board) => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return false;
};

checkDraw = (board) => {
    return board.includes(0) ? false : true;
};

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    let roomID = null;

    for (let id in rooms) {
        if (rooms[id].players.length === 1) {
            roomID = rooms[id].roomId;
            rooms[id].players.push(socket.id);

            socket.join(roomID);
            io.to(roomID).emit("start game", { roomId: roomID });

            console.log(rooms);

            socket.emit("game ready", { marker: "o" });
            socket.to(rooms[id].players[0]).emit("game ready", { marker: "x" });

            break;
        }
    }

    if (roomID === null) {
        roomID = `room-${socket.id}`;

        rooms[roomID] = {
            roomId: roomID,
            players: [socket.id],
            game: Array(9).fill(0),
            currentMove: 0,
        };

        socket.join(roomID);
        socket.emit("waiting for opponent");
    }

    socket.on("player move", (data) => {
        const room = rooms[roomID];
        if (!room) return;

        const playerIndex = room.players.indexOf(socket.id);
        if (playerIndex !== room.currentMove) {
            return;
        }

        playerMarker = playerIndex === 0 ? "x" : "o";
        room.game[data.index] = playerMarker;

        opponentIndex = playerIndex === 0 ? 1 : 0;
        opponentSocketId = room.players[opponentIndex];

        io.to(opponentSocketId).emit("player move", {
            index: data.index,
            marker: playerMarker,
        });

        console.log(room.game);

        room.currentMove = opponentIndex;
        socket.emit("move ack", room.currentMove);

        const winner = checkWin(room.game);
        if (winner) {
            io.to(roomID).emit("game won", { winner: winner });
            rooms[roomID].game = Array(9).fill(0);
            rooms[roomID].currentMove = 0;
        }
        if (checkDraw(room.game)) {
            rooms[roomID].game = Array(9).fill(0);
            rooms[roomID].currentMove = 0;
            io.to(roomID).emit("game draw");
        }
    });

    const disconnectHandler = () => {
        console.log("user disconnected:", socket.id);

        const room = rooms[roomID];
        if (!room || !room.players) return;

        const opponentSocketId =
            room.players.indexOf(socket.id) === 0
                ? room.players[1]
                : room.players[0];

        if (opponentSocketId) {
            io.to(opponentSocketId).emit("opponent disconnected");
        }

        delete rooms[roomID];
    };

    socket.on("disconnect", disconnectHandler);
    socket.on("disconnected", disconnectHandler);
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
