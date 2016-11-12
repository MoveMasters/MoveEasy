const Clarifai = require('clarifai');
const secret = require('./../secret');
const fs = require('fs'); 
const Scraper = require ('images-scraper')
const Promise = require('bluebird');



const bing = new Scraper.Bing();

//var clarifaiModelId = process.env.clarifaiModelId || 'furniture';


//setup constants
const shippingJsonFile = './../shippingData/shippingData.json';
const clarifaiModelName = process.env.clarifaiModelName || 'furniture';
const numItems = process.env.clarifaiModelName || 100;
const numImagesPerItem = process.env.clarifaiModelName || 100;



const app = new Clarifai.App(
  secret.ClarifaiClientId,
  secret.ClarifaiClientSecret
);

app.getToken().then(token =>{
  console.log('token', token);
});


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
    err => { throw err }
  );
};


var deleteAllModels = (cb) => {
  app.models.delete().then(
    function(response) {
      cb(null, response);
    },
    function(err) {
      cb(err, null);
    }
  );
};


var listAllModels = (cb) => {
  app.models.list().then(
    function(response) {
      console.log('list all models response', response);
    },
    function(err) {
      console.log('error listing models', err);
    }
  );
};




var readJson = () => {
  return new Promise ( (resolve, reject) => {
    fs.readFile(shippingJsonFile, 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);
      obj = obj.slice(6, numItems+6);
      resolve(obj);
    });
  });
};

var getModelAndJson = () => {
  return Promise.all([getModel(), readJson()]);
}


//listAllModels();

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



var sendDataToAPI = () => {
  readJson().then( (data) => {
    var intervalID;
    //trains item from data stack
    var trainItem = () => {
      if (data.length === 0) {
        clearInterval(intervalID);
        console.log('done!');
        return;
      }
      const item = data.pop(0);
      const term = item.name;
      getResults(term).then( resultArr => {
        var dataArr = resultArr.map( result => { return {url: result.url, id:term} });
        app.inputs.create(
          dataArr
        ).then( response => {
          console.log('Success with', term);
        }, err => {
          console.log('err with', term, err.status, err.statusText);
        });
      });
    };
    intervalID = setInterval(trainItem, 100);
  });
};


//sendDataToAPI();




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



var getResults = (term, num) => {
  num = num || numImagesPerItem;
  return bing.list({
      keyword: term,
      num: num,
      detail: true
  });
};





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







