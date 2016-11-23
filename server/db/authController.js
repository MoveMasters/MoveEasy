const imageUtil = require('./imageUtil');
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