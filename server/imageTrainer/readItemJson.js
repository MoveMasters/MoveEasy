var fs = require('fs');


module.exports = (options) => {
  options = options || {};
  const fileName = options.fileName || './../../shippingData/shippingData.json';
  const total = options.total || -1;
  const itemArr = JSON.parse(fs.readFileSync(fileName, 'utf8'));

  //special case for all items
  if (total < 0) {
    return itemArr;
  }
  return itemArr.slice(0, total);
}