const Promise = require('bluebird');
const mongoose = require('mongoose');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const User = require('./../db/users/userModel');
const Move = require('./../db/moves/moveModel');
const Item = require('./../db/items/itemModel');
const dbUtil = require('./../db/dbUtil');


//user/move
const username1 = 'username1';
const password1 = 'password1';
const name1 = 'Stephen Cefali';
const phone1 = '909-454-3432';
const currentAddress1 = '944 Market St, San Francisco, CA, 91402';
const futureAddress1 = '916 Kearny St, San Francisco, CA, 94133';
const surveyTime1 = new Date();


const userObj1 = { 
  username: username1,
  password: password1
};



const username2 = 'username2';
const password2 = 'password2';
const name2 = 'Joe Sang';
const phone2 = '343-444-3222';
const currentAddress2 = '1 Market St, San Francisco, CA, 91402';
const futureAddress2 = '123 First St, Los Angeles, CA, 93234';
const surveyTime2 = new Date('Mon Nov 28 2016 11:44:19 GMT-0800 (PST)');

const userObj2 = { 
  username: username2,
  password: password2
};



//item
const itemName1 = 'Chair - Office';

//exports for checking
exports.userObj1 = userObj1;
exports.itemName1 = itemName1;



const imagePath1 = path.resolve(__dirname, 'itemImage1.png');




//natives
//attach token for convience
const getUserFromToken = (token) => {
  const fakeRequest = {
    headers: {'x-access-token': token}
  };
  return dbUtil.getUserFromReq(fakeRequest).then( user => {
    user.token = token;
    return user;
  });
};


const getUserFromRoute = (userObj, request, route) => {
  return new Promise( (resolve, reject) => {
    request.post(route)
    .send(userObj).end( (err, res) => {
      if(err) {
        reject(err);
      } else {
        getUserFromToken(res.body.token).then( user => {
          resolve(user);
        });
      }
    });
  });
}


const getUser1FromRoute = (request, route) => {
  return getUserFromRoute(userObj1, request, route);
}

const getUser2FromRoute = (request, route) => {
  return getUserFromRoute(userObj2, request, route);
}

///export

exports.clearDatabase = () => {
  const userPromise = User.remove().exec();
  const movePromise = Move.remove().exec();
  const itemPromise = Item.remove().exec();
  return Promise.all([userPromise, movePromise, itemPromise]).then( result => {
    return null;
  }).catch( err => {
    console.log('clearDatabase err', err);
    throw err;
  });
};


exports.signinUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signin');
};


exports.signupUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signup');
};


exports.signupUser2 = (request) => {
  return getUser2FromRoute(request, '/api/user/signup');
};



exports.signupUser1CreateMove1 = (request) => {
  return new Promise( (resolve, reject) => {
    exports.signupUser1(request).then( user => {
      request.post('/api/move/newMove')
      .send({
        user_id:user.id,
        surveyTime: surveyTime1,
        name:name1,
        phone:phone1,
        currentAddress: currentAddress1,
        futureAddress: futureAddress1
      })
      .set('x-access-token', user.token)
      .end( (err, res) => {
        if(err) {
          reject(err);
        } else {
          res.body.user_id = mongoose.Types.ObjectId(res.body.user_id);
          resolve([user, res.body]);
        }  
      });
    }).catch( err => {
      throw err;
    });
  });
};


exports.signupUser2CreateMove2 = (request) => {
  return new Promise( (resolve, reject) => {
    exports.signupUser2(request).then( user => {
      request.post('/api/move/newMove')
      .send({
        user_id:user.id,
        surveyTime: surveyTime2,
        name:name2,
        phone:phone2,
        currentAddress: currentAddress2,
        futureAddress: futureAddress2
      })
      .set('x-access-token', user.token)
      .end( (err, res) => {
        if(err) {
          reject(err);
        } else {
          res.body.user_id = mongoose.Types.ObjectId(res.body.user_id);
          resolve([user, res.body]);
        }  
      });
    }).catch( err => {
      throw err;
    });
  });
};




exports.clearToMove1 = (request) => {
  return exports.clearDatabase().then( () => {
    return exports.signupUser1CreateMove1(request);
  });
}

exports.getClientItemObj1 = (move_id) => {
  const imageData = fs.readFileSync(imagePath1, 'base64');
  return {
    name: itemName1,
    moveId: move_id,
    image: imageData,
    quantity: 1,
    going: true,
    room: 'living room',
    cft: 4,
    pbo: false,
    comment: 'This is a comment'
  };
}

