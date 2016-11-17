const Promise = require('bluebird');
const mongoose = require('mongoose');
const User = require('./../db/users/userModel');
const Move = require('./../db/moves/moveModel');
const dbUtil = require('./../db/dbUtil');


const username1 = 'username1';
const password1 = 'password1';
const name1 = 'Stephen Cefali';
const phone1 = '909-454-3432';
const currentAddress1 = '434 Barley Ave, San Francisco, CA, 91407';
const futureAddress1 = '3 Grimald Pl, San Francisco, CA, 91407';
const surveyTime = new Date();

const userObj1 = { username: username1, password: password1 };
exports.userObj1 = userObj1;


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

const getUser1FromRoute = (request, route) => {
  return new Promise( (resolve, reject) => {
    request.post(route)
    .send(userObj1).end( (err, res) => {
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


///export

exports.clearDatabase = () => {
  const userPromise = User.remove().exec();
  const movePromise = Move.remove().exec();
  return Promise.all([userPromise, movePromise]).then( result => {
    return null;
  });
};


exports.signinUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signin');
};


exports.signupUser1 = (request) => {
  return getUser1FromRoute(request, '/api/user/signup');
};


exports.signupUser1CreateMove1 = (request) => {
  return new Promise( (resolve, reject) => {
    exports.signupUser1(request).then( user => {
      request.post('/api/move/newMove')
      .send({user_id:user.id})
      .set('x-access-token', user.token)
      .end( (err, res) => {
        if(err) {
          reject(err);
        } else {
          res.body.user_id = mongoose.Types.ObjectId(res.body.user_id);
          resolve([user, res.body]);
        }  
      });
    });
  });
};
