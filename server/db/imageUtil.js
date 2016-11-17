
const Upload = require('s3-uploader');
const Clarifai = require('clarifai');
const secret = require('./../secret.js');
const fs = require('fs'); 
const s3 = require('./../s3config');
const Promise = require('bluebird');


const shippingListFile = '../shippingData/shippingList.txt';
const clarifaiTagFile = '../shippingData/clarifaiTags.txt';


const clarApp = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);





var readClarifaiTags = () => {
  data = String(fs.readFileSync(clarifaiTagFile, 'utf8'));
  const lines = data.split('\n');
  const tags = lines.map( line => { return line.trim(); });
  return tags;
}


exports.readClarifaiTags = readClarifaiTags;



var readClarifaiItems = () => {
  data = String(fs.readFileSync(shippingListFile, 'utf8'));
  const lines = data.split('\n');
  const items = lines.map( line => { return line.trim(); });
  items.sort();
  return items;
}

exports.readClarifaiItems = readClarifaiItems;


exports.saveAndUpload = (filePath, photoData) => {
  const savePromise = new Promise( (resolve, reject) => {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });

  return savePromise.then( (success) => {
    return new Promise( (resolve, reject) => {
      s3.upload(filePath, {}, (err, versions) => {
        if (err) {
          reject(err);
        } else if (versions.length < 1) {
          reject('No images uploaded');
        } else {
          const imageUrl = versions[versions.length - 1].url;
          resolve(imageUrl);
        }
      });
    });
  });
};

exports.getClarifaiToken = () => {
  //console.log('token', tokenResponse.access_token);
  //return tokenResponse.access_token;
  return clarApp.getToken().then( token => {
    return token.access_token;
  });
};


