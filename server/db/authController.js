
const imageUtil = require('./imageUtil');

module.exports = {
  sendClarifaiToken(req, res, next) {
    const token = imageUtil.getClarifaiToken();
    res.send(token);
  }
};
