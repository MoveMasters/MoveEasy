var fs = require('fs');


module.exports = readItemJson (options) => {
  var fileName = options.fileName || './../shippingData/shippingData.json';
  var total = options.total || 50;
  var itemArr = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  return itemArr.slice(0, total);
}