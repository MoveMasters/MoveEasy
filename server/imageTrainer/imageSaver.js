const fs = require('fs');
const Scraper = require ('images-scraper');
const request = require('request');
const bing = new Scraper.Bing();


const shippingJsonFile = __dirname + '/../../shippingData/shippingData.json';
const clarifaiModelName = process.env.clarifaiModelName || 'furniture';
const numItems = process.env.numItems || 10;
const numImagesPerItem = process.env.numImagesPerItem || 10;
const offset = 0;


var readJson = () => {
  return new Promise ( (resolve, reject) => {
    fs.readFile(shippingJsonFile, 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);
      obj = obj.slice(offset, numItems+offset);
      resolve(obj);
    });
  });
};


var getResults = (term, num) => {
  num = num || numImagesPerItem;
  return bing.list({
      keyword: term,
      num: num,
      detail: true
  });
};


var imageSaver = () => {
  readJson().then( data => {
    data.forEach( item => {
      const term = item.name;
      const path = './../shippingData/scrapedImages/' + term;
      if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      getResults(term).then( resultArr => {
        for (var i = 0; i < resultArr.length; i ++) {
          const result = resultArr[i];
          const imagePath = path + '/' + i + '.jpg';
          const file = fs.createWriteStream(imagePath);
          const sendReq = request.get(result.url);
          sendReq.pipe(file);
        }
      });
    });
  });
};


imageSaver();

