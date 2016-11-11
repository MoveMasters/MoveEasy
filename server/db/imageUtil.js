
const Upload = require('s3-uploader');
const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const s3 = require('./../s3config');
const Promise = require('bluebird');



const clarApp = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);



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


exports.predict = (imageUrl) => {
  return clarApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl);
};


