const Promise = require('bluebird');
const mongoose = require('mongoose');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const User = require('./../db/users/userModel');
const Mover = require('./../db/movers/moverModel');
const Move = require('./../db/moves/moveModel');
const Item = require('./../db/items/itemModel');
const Message = require('./../db/messages/messageModel');
const dbUtil = require('./../db/dbUtil');


//user/move
const username1 = 'username1';
const password1 = 'password1';
const name1 = 'Stephen Cefali';
const phone1 = '909-454-3432';
const company1 = 'FakeCompany';
const currentAddress1 = '944 Market St, San Francisco, CA, 91402';
const futureAddress1 = '916 Kearny St, San Francisco, CA, 94133';
const surveyTime1 = new Date();


const userObj1 = { 
  username: username1,
  password: password1,
  name: name1
};



const username2 = 'username2';
const password2 = 'password2';
const name2 = 'Joe Sang';
const phone2 = '343-444-3222';
const company2 = 'MoveFast';
const currentAddress2 = '1 Market St, San Francisco, CA, 91402';
const futureAddress2 = '123 First St, Los Angeles, CA, 93234';
const surveyTime2 = new Date('Mon Nov 28 2016 11:44:19 GMT-0800 (PST)');

const userObj2 = { 
  username: username2,
  password: password2,
  name: name2
};


const username3 = 'steve';
const password3 = 'adfasdfs';
const name3 = 'Erik Sudds';
const phone3 = '999-999-9999';
const currentAddress3 = 'Home';
const futureAddress3 = 'Work';
const surveyTime3 = new Date('Tue Nov 29 2016 11:44:19 GMT-0800 (PST)');

const userObj3 = { 
  username: username3,
  password: password3,
  name: name3
};




const movername1 = 'Jim Mahon'
const moveruser1 = 'jmahon@movekick.com';
const moverpass1 = '12113';

const moverObj1 = {
  username: moveruser1,
  password: moverpass1,
  company: company1,
  name: movername1
}


//item
const itemName1 = 'Chair - Office';



//exports for checking
exports.userObj1 = userObj1;
exports.userObj2 = userObj2;
exports.userObj3 = userObj3;
exports.moverObj1 = moverObj1;
exports.itemName1 = itemName1;



const imagePath1 = path.resolve(__dirname, 'itemImage1.png');




//natives
//attach token for convience
const getUserFromToken = (token) => {
  const fakeRequest = {
    headers: {'x-access-token': token}
  };
  return dbUtil.getUserFromReq(fakeRequest).then( user => {
    if(!user) {
      throw new Error('Could not find from token');
    }
    user.token = token;
    return user;
  })
  .catch( err => {
    console.log('getUserFromToken err', err);
    throw err;
  });
};


const getUserFromRoute = (userObj, request, route) => {
  return new Promise( (resolve, reject) => {
    request.post(route)
    .send(userObj).end( (err, res) => {
      if(err) {
        console.log('getUserFromRoute err', err);
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

const getUser3FromRoute = (request, route) => {
  return getUserFromRoute(userObj3, request, route);
}

///export

exports.clearDatabase = () => {
  const userPromise = User.remove().exec();
  const movePromise = Move.remove().exec();
  const itemPromise = Item.remove().exec();
  const messagePromise = Message.remove().exec();
  return Promise.all([userPromise, movePromise, itemPromise, messagePromise]).then( result => {
    return null;
  }).catch( err => {
    console.log('clearDatabase err', err);
    throw err;
  });
};


exports.signinUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signin');
};

exports.signinUser2 = (request) => {
  return getUser2FromRoute(request, '/api/user/signin');
};


exports.signupUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signup');
};


exports.signupUser2 = (request) => {
  return getUser2FromRoute(request, '/api/user/signup');
};

exports.signupUser3 = (request) => {
  return getUser3FromRoute(request, '/api/user/signup');
};

exports.signupMover1 = (request) => {
  return getUserFromRoute(moverObj1, request, '/api/mover/signup');
}



exports.clearAndSignupUsers123 = (request) => {
  return exports.clearDatabase().then( () => {
    const promise1 = exports.signupUser1(request);
    const promise2 = exports.signupUser2(request);
    const promise3 = exports.signupUser3(request);
    return Promise.all([promise1, promise2, promise3]).then( result => {
      return result;
    })
    .catch( err => {
      console.log('clearAndSignupUsers123 err', err);
      throw err;
    });
  });
}


const createMove1 = (request, user) => {
  return new Promise( (resolve, reject) => {
    request.post('/api/move/newMove')
    .send({
      user_id:user.id,
      surveyTime: surveyTime1,
      phone:phone1,
      currentAddress: currentAddress1,
      futureAddress: futureAddress1,
      company: company1
    })
    .set('x-access-token', user.token)
    .end( (err, res) => {
      if(err) {
        reject(err);
      } else {
        res.body.user_id = mongoose.Types.ObjectId(res.body.user_id);
        resolve(res.body);
      }
    });
  });
}

const createMove2 = (request, user) => {
  return new Promise( (resolve, reject) => {
    request.post('/api/move/newMove')
    .send({
      user_id:user.id,
      surveyTime: surveyTime2,
      phone:phone2,
      currentAddress: currentAddress2,
      futureAddress: futureAddress2,
      company: company1
    })
    .set('x-access-token', user.token)
    .end( (err, res) => {
      if(err) {
        reject(err);
      } else {
        res.body.user_id = mongoose.Types.ObjectId(res.body.user_id);
        resolve(res.body);
      }
    });
  });
}



exports.signupUser2CreateMove2 = (request) => {
  return userMovePromise = exports.signupUser2(request).then( user => {
    return createMove2(request, user).then( move => {
      return [user, move];
    });
  });
}


exports.setupMove1 = (request) => {
  const userMovePromise = exports.signupUser1(request).then( user => {
    return createMove1(request, user).then( move => {
      return [user, move];
    });
  });

  const moverPromise = exports.signupMover1(request);
  return Promise.all([userMovePromise, moverPromise]).then( result => {
    const output = [result[0][0], result[1], result[0][1]];
    return output;
  });
}



exports.clearSetupMove1 = (request) => {
  return exports.clearDatabase().then( () => {
    return exports.setupMove1(request);
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

