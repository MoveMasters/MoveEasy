
const Upload = require('s3-uploader');
const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const s3 = require('./../s3config');
const Promise = require('bluebird');
const trainerUtil = require('./../imageTrainer/trainerUtil');





const clarApp = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);

var tokenResponse;

clarApp.getToken().then( token => {
  tokenResponse = token;
});

var clarifaiModel;
trainerUtil.getModel().then( model => {
  clarifaiModel = model;
});




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
    console.log('saved image');
    return new Promise( (resolve, reject) => {
      s3.upload(filePath, {}, (err, versions) => {
        console.log('done with upload');
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
  console.log('token', tokenResponse.access_token);
  return tokenResponse.access_token;
};


exports.predict = (imageUrl) => {
  //trainerUtil.listAllModels();
  //return clarApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl);
  //return clarifaiModel.predict(imageUrl);
  return clarifaiModel.train().then(
    response =>{
      return clarifaiModel.predict(imageUrl);
    },
    err => {
      console.log('err training');
    }
  );
};


