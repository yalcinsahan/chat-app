import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken'

export const mySocket = (httpServer: any) => {

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }});

  const users: any = {}; 

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (token) => {

      const decoded = jwt.decode(token, { json: true });
      
      users[socket.id] = decoded?.id;
      io.emit('updateUsers', Object.values(users));      
    });

    socket.on('privateMessage', ({ sender, receiver, message }) => {
      
      const receiverId = Object.keys(users).find(key => users[key] == receiver);

      const decoded = jwt.decode(sender, { json: true });
      if (receiverId) {        
        io.to(receiverId).emit('privateMessage', { sender: decoded?.username, message });
      }
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('updateUsers', Object.values(users));
    });
  });

};
