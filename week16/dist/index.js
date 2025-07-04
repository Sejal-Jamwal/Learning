"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (socket) => {
    setInterval(() => {
        socket.send("seju is best");
    }, 5000);
    // whenever a user sends the message to the websocket server
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
