const mongoose = require('mongoose');
const Q = require('q');



const mongoUser = 'MoveKick';
const mongoPassword = 'moveeasy';
const mongoTestURI = `mongodb://${mongoUser}:${mongoPassword}@ds157667.mlab.com:57667/movekicktest`;
const mongoProdURI = `mongodb://${mongoUser}:${mongoPassword}@ds157677.mlab.com:57677/movekick`;

const isTest = !!process.env.LOADED_MOCHA_OPTS;

const mongoURI = isTest ? mongoTestURI : mongoProdURI;

if(isTest) {
  process.env.IS_TEST = 1;
} else {
  delete process.env.IS_TEST;
}


module.exports = () => {
  mongoose.connect(mongoURI, {server:{auto_reconnect:true}});

  mongoose.connection.on('open', () => {
    console.log('mongoose connection opened');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection closed');
    mongoose.connect(mongoURI, {server:{auto_reconnect:true}});
  });

  mongoose.Promise = Q.Promise;
  return mongoose;
};