import { app } from "./app";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketConnections } from "./ws";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Create an HTTP server
const server = createServer(app);

const allowedOrigins = ["http://localhost:5173"];
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

// Initialize socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle socket connections
handleSocketConnections(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
