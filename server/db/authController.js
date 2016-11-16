const imageUtil = require('./imageUtil');
const secret = require('./../secret');
const nameMappings = require('./../imageTrainer/nameMappings');
const readItemJson = require('./../imageTrainer/readItemJson');


exports.sendClarifaiInfo = (req, res, next) => {
  imageUtil.getClarifaiToken().then( clarifaiToken => {
    const obj = {
      clarifaiToken: clarifaiToken,
      clarifaiTags: imageUtil.readClarifaiTags(),
      clarifaiItems: imageUtil.readClarifaiItems(),
      itemPrototypes: readItemJson(),
      ClarifaiClientId: secret.ClarifaiClientId,
      ClarifaiClientSecret: secret.ClarifaiClientSecret,
      nameMappings: nameMappings
    }
    res.send(obj);
  })
  .catch( err => {
    console.log('sendClarifaiInfo err', err);
    throw err;
  });
};