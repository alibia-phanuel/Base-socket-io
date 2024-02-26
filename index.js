//Imporatation et creation du server
import express from "express";
import { createServer } from "node:http";
//xxxxxx
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
//importation de soket .io
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

//intance de socket.io
const io = new Server(server, {
  connectionStateRecovery: {},
});
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//  ceci émettra l'événement à toutes les sockets connectées
io.emit("hello", "world");
//RESIVE THE MESSAGE
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
