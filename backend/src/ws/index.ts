import { Server } from "socket.io";

export function handleSocketConnections(io: Server) {
  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("chat-message", (msg) => {
      socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
}
