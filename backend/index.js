// Lib
const path = require("path");
const { createServer } = require('http');
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

// Using .env
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Modules
const db = require("./database");
const rootRouter = require("./routes/root");
const roomRouter = require("./routes/room");
const uploadRouter = require("./routes/upload");
const connectWithRoom = require("./socket/connectWithRoom");

// Initialization Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use("/img", express.static(path.join(__dirname, 'images')))
app.use("/", rootRouter);
app.use("/room", roomRouter);
app.use("/upload", uploadRouter);

// Initialization socket.io app
const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: ["http://localhost:3000", "https://librebay.com/"]
  }
});

// Connect with bd
db.mongoose.connect(MONGODB_URI, { dbName: "raccon-phone" });

// Connect with socket
io.on('connection', (socket) => connectWithRoom(socket));

// Listen to port
server.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});