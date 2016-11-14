const mongoose = require('mongoose');
const Q = require('q');


module.exports = () => {
  mongoose.connect('mongodb://localhost/MoveKick');

  mongoose.connection.on('open', () => {
    console.log('mongoose connection opened');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection closed');
  });

  mongoose.Promise = Q.Promise;
  return mongoose;
};