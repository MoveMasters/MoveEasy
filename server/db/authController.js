const imageUtil = require('./imageUtil');
const nameMappings = require('./../imageTrainer/nameMappings');


exports.sendClarifaiInfo = (req, res, next) => {
  imageUtil.getClarifaiToken().then( clarfaiToken => {
    const obj = {
      clarfaiToken: clarfaiToken,
      clarifaiTags: imageUtil.readClarfaiTags(),
      clarfaiItems: imageUtil.readClarfaiItems(),
      nameMappings: nameMappings
    }
    res.send(obj);
  })
  .catch( err => {
    console.log('sendClarifaiInfo err', err);
    throw err;
  });
};