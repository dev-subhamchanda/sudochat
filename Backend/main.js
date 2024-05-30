import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const PORT = 3000;
const server = createServer(app);
const io = new Server(server);

// CORS configuration
const corsConfig = {
  origin: `http://localhost:5173`,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsConfig));
app.options('*',cors(corsConfig))
app.get('/', (req, res) => {
  res.send("Server Is Running");
});

// Websockets
io.on('connection', (socket) => {
  console.log("User Connected");
  socket.on('sent-msg', (data) => {
    console.log('Received: ', data);
    io.emit('get-msg', data);
  });
  socket.on('disconnect', () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
