const socketio = require('socket.io');

const roomList = {};
const socketIdsInRoom = (name) => {
  var socketIds = io.nsps['/'].adapter.rooms[name];
  if (socketIds) {
    var collection = [];
    for (var key in socketIds) {
      collection.push(key);
    }
    return collection;
  } 

  return [];
};

module.exports = (server) => {
  const io = socketio(server);

  io.on('connection', function(socket){
    console.log('connection');

    socket.on('disconnect', function(){
      console.log('disconnect');
      if (socket.room) {
        var room = socket.room;
        io.to(room).emit('leave', socket.id);
        socket.leave(room);
      }
    });

    socket.on('join', function(name, callback){
      console.log('join', name);
      var socketIds = socketIdsInRoom(name);
      callback(socketIds);
      socket.join(name);
      socket.room = name;
    });

    socket.on('exchange', function(data){
      console.log('exchange', data);
      data.from = socket.id;
      console.log('data.from', data.from);
      console.log('io.sockets.connected', io.sockets.connected);
      console.log('data.to', data.to);
      var to = io.sockets.connected[data.to];
      to.emit('exchange', data);
    });
  });
};