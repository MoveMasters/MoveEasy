const mongoose = require('mongoose');
const Q = require('q');



const mongoUser = 'MoveKick';
const mongoPassword = 'moveeasy';
const mongoTestURI = `mongodb://${mongoUser}:${mongoPassword}@ds157667.mlab.com:57667/movekicktest`;
const mongoProdURI = `mongodb://${mongoUser}:${mongoPassword}@ds157677.mlab.com:57677/movekick`;

const isTest = !!process.env.LOADED_MOCHA_OPTS;

const mongoURI = isTest ? mongoTestURI : mongoProdURI;

console.log('mongoURI', mongoURI);


module.exports = () => {
  mongoose.connect(mongoURI);

  mongoose.connection.on('open', () => {
    console.log('mongoose connection opened');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection closed');
  });

  mongoose.Promise = Q.Promise;
  return mongoose;
};