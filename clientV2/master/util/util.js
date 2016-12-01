import axios from 'axios';
import reactCookie from 'react-cookie';
// const ip = '10.6.27.137';
const ip = 'localhost';
const port = '9000';
const localURL = `http://${ip}:${port}`;
const herokuURL = 'https://movekickinc.herokuapp.com';
const serverURL = reactCookie.load('MoveKickDev') ? localURL : herokuURL;



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
const updateItemURL = `${serverURL}/api/item/updateItem`;
const getAllMovesURL = `${serverURL}/api/move/allMoves`;
const getPendingMovesURL = `${serverURL}/api/move/pendingMoves`;
const getExistingMoveURL = `${serverURL}/api/move/existingMove`;
const getMoveItemsURL = `${serverURL}/api/item/moveItems`;
const signupMoverUrl = `${serverURL}/api/mover/signup`;
const signinMoverURL = `${serverURL}/api/mover/signin`;
const sendMessageURL = `${serverURL}/api/message/newMessageFromMover`;
const getConversationURL = `${serverURL}/api/message/conversationForMover`;
const getContactsURL = `${serverURL}/api/mover/contacts`;
const updateUserMoveInfoURL = `${serverURL}/api/move/updateUserMoveInfo`;





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


const updateUserMoveInfo = (userMoveInfo) => {
  console.log('it');
  return axios.post(updateUserMoveInfoURL, userMoveInfo).then(
    (response) => {
      //no object in response
      console.log('updateUserMoveInfo success');
    }
  ).catch(
    (err) => {
      console.log('updateUserMoveInfo err', err);
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

const updateItem = (item) => {
  return axios.post(updateItemURL, {item: item}).then(
    (response) => {
      console.log('updateItem success');
    }
  ).catch(
    (err) => {
      console.log('updateItem err', err);
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




const getInitialInventory = (moveId) => {
  return axios.get(getMoveItemsURL, {
    params: { moveId }
  })
  .then( response => {
    return response.data.moveItems;
  })
  .catch( err => {
    console.log('getInitialInventory err', err);
    throw err;
  });
}


/************************************ MOVES ************************************/


const getAllMoves = () => {
  return axios.get(getAllMovesURL).then( response => {
    return response.data.moves;
  });
}

const getPendingMoves = () => {
  return axios.get(getPendingMovesURL).then( response => {
    return response.data.moves;
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

/************************************ LOGIN ************************************/

const signupMover = (moverObj) => {
  console.log('calling signup mover')
  return axios.post(signupMoverUrl, moverObj)
  .then( response => {
    return response.data;
  })
  .catch( err => {
    console.log('signupMover err', err);
    throw err;
  });
};

const signinMover = (username, password) => {
  return axios.post(signinMoverURL, {username, password})
  .then( response => {
    return response.data;
  })
  .catch( err => {
    console.log('signinMover err', err);
    throw err;
  });
};


/************************************ MESSAGING ************************************/

const sendNewMessage = (userId, text) => {
  return axios.post(sendMessageURL, {userId, text})
  .then( response => {
    return response.data;
  })
  .catch( err => {
    console.log('sendNewMessage err', err);
    throw err;
  });
};


const getConversation = (userId) => {
  return axios.get(getConversationURL, {
    params: {userId}
  })
  .then( response => {
    console.log('getConversation', response.data.messages);
    return response.data.messages;
  })
  .catch( err => {
    console.log('getConversation err', err);
    throw err;
  });
};

/************************************CONTACTS ************************************/

const getContacts = () => {
  return axios.get(getContactsURL)
  .then( response => {
    return response.data.contacts;
  })
  .catch( err => {
    console.log('getContacts err', err);
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
  getExistingMove,
  getPendingMoves,
  signupMover,
  signinMover,
  sendNewMessage,
  getConversation,
  serverURL,
  getContacts,
  updateUserMoveInfo,
  updateItem
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
