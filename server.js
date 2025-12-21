const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("join game", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
        socket.to(roomId).emit("player joined");
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
