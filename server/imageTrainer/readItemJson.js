var fs = require('fs');


module.exports = (options) => {
  var fileName = options.fileName || './../shippingData/shippingData.json';
  var total = options.total || 50;
  var itemArr = JSON.parse(fs.readFileSync(fileName, 'utf8'));

  //special case for all items
  if (total < 0) {
    return itemArr;
  }
  return itemArr.slice(0, total);
}