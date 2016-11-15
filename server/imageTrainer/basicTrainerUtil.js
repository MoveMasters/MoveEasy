/*

A utility for making models with concepts hardcoded in a file
The file should only contain concepts in the default models

*/



const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const Scraper = require ('images-scraper')
const Promise = require('bluebird');



const bing = new Scraper.Bing();

//setup constants
const shippingJsonFile = './../shippingData/shippingData.json';
const clarifaiModelName = 'furnitureBasic';
const clarifaiTagFile = './../shippingData/clarifaiTags.txt';
const shippingListFile = './../shippingData/shippingList.txt';




const app = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);


var getModel = () => {
  return app.models.search(clarifaiModelName, 'concept').then(
  response => {
    if(response.length === 0) {
      return initializeModel();
    } else {
      return response[0];
    }
  },
  err => { 
    console.log('error getting model', clarifaiModelName);
    throw err;
  });
};


exports.getModel = getModel;


var deleteModel = () => {
  return app.models.delete(clarifaiModelName).then( response => {
    console.log('success deleting model', clarifaiModelName);
    return true;
  },
  err => {
    console.log('error deleting models', err);
    throw err;
  });
}


var readTags = () => {
  data = String(fs.readFileSync(clarifaiTagFile, 'utf8'));
  const lines = data.split('\n');
  const tags = lines.map( line => { return line.trim(); });
  return tags;
}


exports.readTags = readTags;



var getItems = () => {
  data = String(fs.readFileSync(shippingListFile, 'utf8'));
  const lines = data.split('\n');
  const items = lines.map( line => { return line.trim(); });
  return items;
}

exports.getItems = getItems;





var createModel = () => {
  const tags = readTags();
  const conceptData = tags.map( item => {return {id: item}} );
  return app.models.create(
    clarifaiModelName,
    conceptData
  ).then( response => {
    console.log('success creating', clarifaiModelName);
    return response;
  },
  err => {
    console.log('err creating model', clarifaiModelName);
    throw err;
  });
};

exports.createModel = createModel;



var createAndTrain = () => {
  return deleteModel().then( success => {
    return createModel().then(
      model => {
        return model.train().then(
          response => {
            console.log('success training model', model.name);
            return model;
          },
          err => {
            console.log('error training model');
            throw err;
          }
        );
      }
    );
  });
};


exports.createAndTrain = createAndTrain;


var showTrainingData = () => {
  getModel().then(
    model => {
      model.getVersions().then( response => {
        console.log('versions', response.data.model_versions);
      });
    }
  );
};


exports.showTrainingData = showTrainingData;


var addDummy = () => {
  const url = 'https://a.1stdibscdn.com/archivesE/upload/9493/26_15/2534452/2534452-1.jpeg';
  const term = 'cabinet';
  const obj = {
    url: url,
    concepts: [
      { 
        id: term,
        value: true
      }
    ]
  };
  app.inputs.create(obj).then(
  response => {
    console.log('Success with', term, obj.url);
  },
  err => {
    console.log('err with', term, obj.url, err.status, err.statusText);
  });
};

exports.addDummy = addDummy;


