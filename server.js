import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import registerSocket from "./socket.js";

const app = express();
app.use(cors());

const httpServer = createServer(app);

// create io FIRST
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// pass io into socket logic
registerSocket(io);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});