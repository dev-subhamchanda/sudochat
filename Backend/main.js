import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;
const server = createServer(app);
const io = new Server(server);

let connectedUsers = 0;

// CORS configuration
const corsConfig = {
  origin: `http://localhost:5173`,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// Websockets
let client = 0;
io.on('connection', (socket) => {
  console.log("User Connected");
  client++;
  if(client >=2){
    socket.emit('chat-established',"connected")
  }
    socket.on('sent-msg', (data) => {
      console.log('Received: ', data);
      io.emit('get-msg', data);
    });
    
    socket.on('disconnect', () => {
      console.log("Client disconnected");
      connectedUsers--;
      console.log("Connected Users:", connectedUsers);
    });
  // } else {
  //   console.log("Connection rejected: Maximum users limit reached");
  //   socket.emit('max-users-error', 'Maximum users limit reached');
  //   socket.disconnect(true);
  // }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
