const { Server } = require('socket.io');

module.exports = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`[socket] connected: ${socket.id}`);

    socket.on('chat message', (msg) => {
      console.log(`[socket] message from ${socket.id}: ${msg}`);
      io.emit('chat message', { from: socket.id, msg });
    });

    socket.on('disconnect', () => {
      console.log(`[socket] disconnected: ${socket.id}`);
    });
  });
};
