const imageUtil = require('./imageUtil');
const dbUtil = require('./dbUtil');
const gUserController = require('./generalUsers/generalUserController');
const gUser = require('./generalUsers/generalUserModel');
const User = require('./users/userModel');
const Mover = require('./movers/moverModel');


// const secret = require('./../secret');
const nameMappings = require('./../imageTrainer/nameMappings');
const readItemJson = require('./../imageTrainer/readItemJson');


exports.sendClarifaiInfo = (req, res, next) => {
  var itemDict = {};
  readItemJson().forEach( value => {itemDict[value.name] = value});

  imageUtil.getClarifaiToken().then( clarifaiToken => {
    const obj = {
      clarifaiToken: clarifaiToken,
      clarifaiTags: imageUtil.readClarifaiTags(),
      clarifaiItems: imageUtil.readClarifaiItems(),
      itemPrototypes: itemDict,
      ClarifaiClientId: process.env.CLARIFAI_CLIENT_ID,
      ClarifaiClientSecret: process.env.CLARIFAI_CLIENT_SECRET,
      nameMappings: nameMappings
    }
    res.send(obj);
  })
  .catch( err => {
    console.log('sendClarifaiInfo err', err);
    throw err;
  });
};



const checkAuth = (model, req, res, next) => {

  const user = dbUtil.decodeUserFromHeader(req);
  const username = user.username;

  /** Check to see if that user exists in the database and respond with right status code */
  model.findOne({ username }).exec()
  .then((foundUser) => {
    if (foundUser) {
      next();
    } else {
      res.sendStatus(401);
    }
  })
  .fail((error) => {
    res.sendStatus(404);
  });
}

exports.checkGenAuth = (req, res, next) => {
  return checkAuth(gUser, req, res, next);
}

exports.checkUserAuth = (req, res, next) => {
  return checkAuth(User, req, res, next);
}


exports.checkMoverAuth = (req, res, next) => {
  return checkAuth(Mover, req, res, next);
}



