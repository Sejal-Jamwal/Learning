import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 8080});

wss.on('connection', (socket) => {
    
    setInterval(() => {
         socket.send("seju is best");
    }, 5000);

   // whenever a user sends the message to the websocket server
   socket.on("message", (e) => {
        console.log(e.toString());
   })

});
