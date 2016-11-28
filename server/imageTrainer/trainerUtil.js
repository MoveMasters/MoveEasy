/*
A utility file for training models with custom inputs
currently NOT in use!


Should form basis of a model with training of non-default concepts with url inputs from a scraper

*/
const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const Scraper = require ('images-scraper')
const Promise = require('bluebird');



const bing = new Scraper.Bing();

//setup constants
const shippingJsonFile = __dirname + '/../../shippingData/shippingData.json';
const clarifaiModelName = process.env.clarifaiModelName || 'furniture';
const numItems = process.env.numItems || 49;
const numImagesPerItem = process.env.numImagesPerItem || 100;
const offset = 0;
const timeBetweenCalls = process.env.timeBetweenCalls || 200;



const app = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);


var getResults = (term, num) => {
  num = num || numImagesPerItem;
  return bing.list({
      keyword: term,
      num: num,
      detail: true
  });
};



//check to see if our model exists

var initializeModel = () => {
  app.models.create(clarifaiModelName).then(
    response => {
    console.log('init');
      return response;
    },
    err => {throw err; }
  );
}





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




var deleteAllModels = () => {
  return app.models.delete().then( response => {
    console.log('success deleting models');
    return true;
  },
  err => {
    console.log('error deleting models', err);
    throw err;
  });
}



var listAllModels = () => {
  app.models.list().then(
    function(response) {
      console.log('list all models response', response);
    },
    function(err) {
      console.log('error listing models', err);
    }
  );
};

exports.listAllModels = listAllModels;


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

var getModelAndJson = () => {
  return Promise.all([getModel(), readJson()]);
};




var createModel = () => {
  return Promise.all([readJson(), deleteAllModels()]).then(
  result => {
    const data = result[0];
    const conceptData = data.map( item => {return {id: item.name}} );
    console.log(conceptData);
    return app.models.create(
      clarifaiModelName,
      conceptData
    ).then( response => {
      console.log('success creating', clarifaiModelName);
      return response;
    },
    err => {
      console.log('err creating model');
      throw err;
    });
  });
};

var createAndTrain = () => {
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





var createApiObjects = () => {
  var term;
  return readJson().then( (data) => {
    var promises = [];
    var concepts = [];
    data.forEach(item => {
      term = item.name
      const promise = getResults(term);
      promises.push(promise);
      concepts.push(term);
    });
    var outputs = [];
    return Promise.all(promises).then(allResults => {
      for (var i = 0; i < allResults.length; i ++) {
        var termResult = allResults[i];
        //console.log('fulfilled', termResult);
        term = concepts[i];
        termResult.forEach(result => {
          var url = result.url;
          var obj = {
            url: url,
            concepts: [{ 
            id: term,
            value: true
          }]};
          outputs.push(obj);
        });
      }
      return outputs;
    });
  });
};


exports.createApiObjects = createApiObjects;


var sendDataToAPI = () => {
  createApiObjects().then( data => {
    var intervalID;
    //trains item from data stack
    var trainItem = () => {
      if (data.length === 0) {
        clearInterval(intervalID);
        console.log('done!');
        return;
      }
      var obj = data.pop(0);
      var term = obj.concepts[0].id;
      //console.log('sending', term, obj.url);
      app.inputs.create(obj).then(
      response => {
        console.log('Success with', term, obj.url);
      },
      err => {
        console.log('err with', term, obj.url, err.status, err.statusText);
      });
    }
    intervalID = setInterval(trainItem, timeBetweenCalls);
  });
};


exports.sendDataToAPI = sendDataToAPI;


//sendDataToAPI();


// var addConcepts = () => {
//   getModelAndJson().then( tuple => {
//     const model = tuple[0];
//     const data = tuple[1];
//     console.log('mod', typeof model);
//     const conceptData = data.map( item => {id: item.name});
//     model.addConcept(conceptData).then( response => {
//       console.log('addConcepts response', response);
//     },
//     err => {
//       console.log('addConcepts err', err);
//     });
//   });
// };



// getModelAndJson().then( tuple => {
//   const model = tuple[0];
//   const data = tuple[1];
//   //console.log('model', model);
//   model.getOutputInfo().then(
//     function(response) {
//       console.log('response', response);
//     },
//     function(err) {
//       // there was an error
//     }
//   );
// })


// var updateModel = (model) => {
//   console.log('model', model.__proto__);
//   readJson().then(
//     data => {
//       const conceptData = data.map( item => {id: item.name});
//       model.addConcepts(conceptData).then( response => {
//         console.log('addConcepts response', response);
//       },
//       err => {
//         console.log('addConcepts err', err);
//       });
//     },
//     err => {
//       throw err;
//     }
//   );
// };




// readJson().then( (data) => {
//   data.forEach( item => {
//     const term = item.name;
//     getResults(term).then( resultArr => {
//       var dataArr = resultArr.map( result => { return {url: result.url, id:term} });
//       app.inputs.create(
//         dataArr
//       ).then( response => {
//         console.log('Success with', term);
//       }, err => {
//         console.log('err with', term, err.status, err.statusText);
//       });
//     });
//   });
// });






// readJson().then( (data) => {

//   data.forEach( item => {
//     const term = item.name;
//     getResults(term).then( resultArr => {
//       resultArr.forEach( result => {
//         app.inputs.create(
//           { url: result.url,
//           concepts: [
//             {
//               id: term,
//               value: true
//             }
//           ]
//         }).then( response => {
//           console.log('Sucess with', term, result.url);
//         }, err => {
//           console.log('error with', term, result.url, err.status, err.statusText);
//         });
//       });
//     });
//   });
// });







// var addImages = () => {
//   return app.inputs.create
// } 




//getModel();







//   return new Promise( (resolve, reject) => {
//     app.models.search(clarifaiModelName, 'concept').then(
//       (response) => {
//         if(response.length === 0) {
//           //reject('Found no Clarifai model of ' + clarifaiModelName);
//           resolve(initializeModel());
//         } else {
//           resolve(response[0]);
//         }
//       },
//       (err) => {
//         reject(err);
//       }
//     ;
//   });
// };
  









// const bing = new Scraper.Bing();




// var getResults = (term, num) => {
//   num = num || 10;
//   return bing.list({
//       keyword: term,
//       num: num,
//       detail: true
//   });
// };



// app.models.search('general-v1.3', 'concept').then(
//   function(response) {
//     console.log('lookup', response.length);
//   },
//   function(err) {
//     // there was an error
//   }
// );



// var modelName = 'test';

// var create = (cb) => {
//   app.models.create(modelName).then (
//     response => {
//       console.log('create', response);
//     },
//     err => {
//       console.log('create', err)
//     }
//   );
// };


// var addResults = (cb) => {
//   getResults('chair').then( (response) => {
//     response.forEach( (searchresult) => {
//       console.log('url', searchresult.url);
//       app.inputs.create({
//         url: searchresult.url,
//         concepts: [
//           {
//             id: 'chair',
//             value: true
//           }
//         ]
//       });
//     });
//   });
// };

// addResults();


// var train = (cb) => {
//   app.models.train(modelName).then(
//     function(response) {
//       console.log('train response');
//       // do something with response
//     },
//     function(err) {
//       // there was an error
//       console.log('train err');
//     }
//   );
// }

// var predict = () => {
//   app.models.predict(modelName, ['http://i.imgur.com/8U6OiDV.jpg']).then(
//     function(response) {
//       console.log('response2', response.data.outputs[0].data);
//     },
//     function(err) {
//       console.log('err', err);
//       // there was an error
//     }
//   );
// }

// predict();

// // app.models.create(
// //   "pets",
// //   [
// //     { "id": "boscoe" }
// //   ]
// // ).then(
// //   function(response) {
// //     // do something with response
// //     console.log('response1', response);
// //   },
// //   function(err) {
// //     // there was an error
// //   }
// // );


// // app.models.train('pets').then(
// //   function(response) {
// //     // do something with response
// //   },
// //   function(err) {
// //     // there was an error
// //   }
// // );




//deleteAllModels(listAllModels);
//deleteAllModels();


// const model_id = 'general-v1.3';

// app.models.get({model_id}).then(
//   function(response) {
//     console.log('response', response);
//   },
//   function(err) {
//     console.log('err', err);
//   }
// );



// function updateModel(model) {
//   model.deleteConcepts({"id": "boscoe"}).then(
//     function(response) {
//       // do something with response
//     },
//     function(err) {
//       // there was an error
//     }
//   );
// }




// var sendDataToAPI = () => {
//   readJson().then( (data) => {
//     var intervalID;
//     //trains item from data stack
//     var trainItem = () => {
//       if (data.length === 0) {
//         clearInterval(intervalID);
//         console.log('done!');
//         return;
//       }
//       const item = data.pop(0);
//       const term = item.name;
//       getResults(term).then( resultArr => {
//         var dataArr = resultArr.map( result => { return {url: result.url, concepts: {id:term, value:true}} });
//         console.log('dataArr', dataArr);
//         app.inputs.create(
//           dataArr
//         ).then( response => {
//           console.log('Success with', term);
//         }, err => {
//           console.log('err with', term, err.status, err.statusText);
//         });
//       });
//     };
//     intervalID = setInterval(trainItem, 100);
//   });
// };




