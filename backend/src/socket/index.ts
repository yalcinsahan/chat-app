import { Server, Socket } from 'socket.io';

export const mySocket = (httpServer: any) => {
  
  const io = new Server(httpServer);

  io.on('connection', (socket: Socket) => {
    console.log('socket connected');

    socket.on("addition", (arg1: number, arg2: number, callback: (result: { sum: number }) => void) => {
      console.log({ arg1, arg2 });
      callback({
        sum: Number(arg1) + Number(arg2)
      });
    });
  });
};
