const imageUtil = require('./imageUtil');
const nameMappings = require('./../imageTrainer/nameMappings');


exports.sendClarifaiToken = (req, res, next) => {
  const token = imageUtil.getClarifaiToken();
  res.send({token: token});
};



exports.sendClarifaiInfo = (req, res, next) => {
  const obj = {
    clarfaiToken: imageUtil.getClarifaiToken(),
    clarifaiTags: imageUtil.readClarfaiTags(),
    clarfaiItems: imageUtil.readClarfaiItems(),
    nameMappings: nameMappings
  }
  res.send(obj);
};