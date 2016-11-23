require('./db/mongooseInit')();

const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();
const testPort = process.env.TEST_PORT || 8000;
const prodPort = process.env.PORT || 9000;
const port = process.env.IS_TEST ? testPort : prodPort;
const options = {
  key: fs.readFileSync(__dirname + '/fake-keys/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/fake-keys/certificate.pem'),
};

// const server = app.listen(port);
let server;
if (process.env.LOCAL) {
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}
var io = require('socket.io')(server);

const roomList = {};

server.listen(port, () => console.log('server up and running at %s port', port));

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
    var to = io.sockets.connected[data.to];
    to.emit('exchange', data);
  });
});

require('./middleware')(app, express, server);
require('./router')(app, express, server);

module.exports = app;
