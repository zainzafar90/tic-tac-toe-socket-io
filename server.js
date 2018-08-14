let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let rooms = 0;

io.on('connection', (socket) => {

  // Create a new game room and notify the creator of game.
  socket.on('createGame', (data) => {
    console.log(`${rooms+1} Created`);
    socket.join(`${++rooms}`);
    socket.emit('newGame', {
      name: data.name,
      room: `${rooms}`
    });
  });

  // Connect the Player 2 to the room he requested. Show error if room full.
  socket.on('joinGame', function (data) {
    var room = io.nsps['/'].adapter.rooms[`${data.room}`];
    if (room && room.length === 1) {
      socket.join(`${data.room}`);
      socket.broadcast.to(`${data.room}`).emit('player1', { room: data.room});
      socket.emit('player2', {
        name: data.name,
        room: data.room
      })
    } else {
      socket.emit('err', {
        message: 'Sorry, The room is full!'
      });
    }
  });

  /**
   * Handle the turn played by either player and notify the other.
   */
  socket.on('playTurn', (data) => {
    console.log(data.tile, data.room);
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: `${data.room}`
    });
  });


  /**
   * Notify the players about the victor.
   */
  socket.on('gameEnded', (data) => {
    console.log('gameEnded', data);
    socket.broadcast.to(`${data.room}`).emit('gameEnd', data);
  });


});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log('started on port 5000');
});
