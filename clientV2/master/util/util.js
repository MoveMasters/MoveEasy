import axios from 'axios';
// const ip = '10.6.27.137';
const ip = 'localhost';
const port = process.env.PORT || '9000';
// const serverURL = `http://${ip}:${port}`;
const serverURL = 'https://iiiiii.herokuapp.com';


/************************************ interceptors ************************************/
axios.interceptors.request.use( config => {
  config.headers.cookies = document.cookie;
  return config;
}, err => {
  return Promise.reject(error);
});

/************************************ URLS ************************************/
const postCroppedImageURL = `${serverURL}/api/item/croppedImage`;
const getClarifaiTokenURL = `${serverURL}/api/auth/clarifaiToken`;
const postImageToClarifaiURL = 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs';
const getClarifaiInfoURL = `${serverURL}/api/auth/clarifaiInfo`;
const postItemToServerURL = `${serverURL}/api/item/newItem`;
const getAllMovesURL = `${serverURL}/api/move/allMoves`;
const getExistingMoveURL = `${serverURL}/api/move/existingMove`;
const getMoveItemsURL = `${serverURL}/api/item/moveItems`;



/************************************ PHOTOS ************************************/
let clarApp, clarifaiTags, clarifaiToken, clarifaiItems, nameMappings, itemPrototypes;

const getClarifaiInfo = () => {
  return axios.get(getClarifaiInfoURL)
  .then( response => {
    const data = response.data;
    clarifaiTags = data.clarifaiTags;
    clarifaiToken = data.clarifaiToken;
    clarifaiItems = data.clarifaiItems;
    nameMappings = data.nameMappings;
    itemPrototypes = data.itemPrototypes;

    clarApp = new Clarifai.App(
      data.ClarifaiClientId,
      data.ClarifaiClientSecret
    );
    
    return data;
  })
  .catch( error => {
    console.log('Error getClarifaiInfo', error) 
    throw err;
  });
}


const getMatches = (tag) => {
  var checkList = [tag];
  if (tag in nameMappings) {
    checkList.push(nameMappings[tag]);
  }
  var matches = [];
  clarifaiItems.forEach( item => {
    var lowered = item.toLowerCase().split(' ');
    for (var i = 0; i < checkList.length; i ++) {
      var tagcheck = checkList[i];
      if (lowered.indexOf(tagcheck) > -1) {
        if (matches.indexOf(item) < 0) {
          matches.push(item);
        }
        break;
      }
    }
  });
  return matches;
}


const predict = (concepts) => {
  console.log('calling predict')
  var predictions = [];

  concepts.forEach(concept => {
    predictions.push(getMatches(concept.name))
  })

  let flatPredictions = [].concat(...predictions)
  return [...new Set( flatPredictions )];
};


const postImageToClarifai = (screenshot) => {
  let base64Image = screenshot.replace(/^data:image\/(jpeg|png|jpg);base64,/, "").toString('base64');

  return  clarApp.models.predict(Clarifai.GENERAL_MODEL, {base64: base64Image}).then(
    (response) => {
      console.log('Success', 'postImageToClarifai')
      let concepts = response.data.outputs[0].data.concepts;
      return predict(concepts);
    },
    (err) => {
      console.error('predict err', err);
      throw err;
    }
  );
}


const postItemToServer = (item) => {
  return axios.post(postItemToServerURL, item).then(
    (response) => {
      console.log('postItemToServer success', response);
      return response.data.moveItems;
    }
  ).catch(
    (err) => {
      console.log('postItemToServer err', err);
      throw err;
    }
  );
}


const getCft = (itemName) => {
  console.log("name/prototypes get cft", itemName, itemPrototypes)
  if (!(itemName in itemPrototypes)) {
    return 10;
  }
  return Math.round(itemPrototypes[itemName].cft);
}


const getAllMoves = () => {
  return axios.get(getAllMovesURL).then( response => {
    return response.data.moves;
  });
}


const getInitialInventory = () => {
  return axios.get(getMoveItemsURL)
  .then( response => {
    return response.data.moveItems;
  })
  .catch( err => {
    console.log('getInitialInventory err', err);
    throw err;
  });
}

const getExistingMove = () => {
  return axios.get(getExistingMoveURL)
  .then( response => {
    return response.data.move;
  })
  .catch( err => {
    console.log('getExistingMove err', err);
    throw err;
  });
}


/************************************ SEARCHBAR ************************************/

const filterSearch = (searchTerm) => {
 if (!searchTerm) {
   return clarifaiItems;
 }
 searchTerm = searchTerm.toLowerCase();
 var results = [];
 clarifaiItems.forEach( item => {
   const lowered = item.toLowerCase();
   if (lowered.includes(searchTerm)) {
     results.push(item);
   }
 });
 return [...new Set( results )];
};

/************************************ EXPORT ************************************/

export default 
{ 
  postImageToClarifai, 
  getClarifaiInfo, 
  filterSearch, 
  getCft, 
  postItemToServer, 
  getInitialInventory,
  getAllMoves,
  getExistingMove
}

//const postImageToClarifaiURL = `https://api.clarifai.com/v1/tag/`;
// const postImageToClarifai = (base64Image) => {
  // return axios(postImageToClarifaiURL, {
  //    method: 'post',
  //    model: 'general-v1.3',
  //    headers: {
  //      'Authorization': `Bearer ${clarifaiToken}`
  //    },
  //    data: {
  //      'encoded_data': base64Image
  //    }
  //  })
  //   .then(function (response) {
  //     console.log(response, 'response from inside utils');
  //     // const concepts = response.data.outputs[0].data.concepts;
  //     const concepts = response.data.results[0].result.tag.classes;

  //     return predict(concepts);
  //   })
  //   .catch(function (error) {
  //     console.log('Error postImageToClarifai:', error);
  //     throw error;
  //   });
//     );
// }
