import { Server } from "socket.io";

export function handleSocketConnections(io: Server) {
  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("receive-message", (msg, name, time) => {
      console.log({ msg, name, time });
      socket.broadcast.emit("chat message", msg);
    });

    socket.on("", () => {});

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
}
