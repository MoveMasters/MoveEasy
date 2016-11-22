/**
 * @file This has all the server-side utility functions needed to check authentication, get userID, etc
 */

/** @module Authentication Utility Server-Side Functions */

const jwt = require('jwt-simple');
const GeneralUser = require('./generalUsers/generalUserModel.js');
const User = require('./users/userModel.js');
const Item = require('./items/itemModel.js');
const Move = require('./moves/moveModel.js');
const mongoose = require('mongoose');
const Promimse = require('bluebird');


const passwordSecret = process.env.passwordSecret || 'secret';


//encode/decode
const encode = (user) => {
  return jwt.encode(user, passwordSecret);
}
exports.encode = encode;



const decode = (user) => {
  return jwt.decode(user, passwordSecret);
}
exports.decode = decode;



exports.encodeSendUser = (user, res) => {
  const token = encode(user);
  exports.getLastMove(user._id).then( lastMove => {
    res.json({ token, lastMove});
  });
};


/**
  * This function is used to find the userId from database given a username.
  * @method getUserIDFromUsername
  * @param {string} username username
  * @param {object} callback callback function
  */
exports.getUserIDFromUsername = (username, callback) => {
  User.findOne({ username }, (err, result) => {
    callback(result._id);
  });
};

/**
  * This function is used to get the username from the request object.
  * @method getUsernameFromReq
  * @param {object} req req object
  * @param {object} next callback function to execute next
  */
exports.getUsernameFromReq = (req, next) => {

  /** Recover username */
  const token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
    return null;
  }
  const username = decode(token).username;
  return username;
};

/**
  * This function is used to get the user from the database.
  * @method getUserFromReq
  * @param {object} req req object
  * @param {object} next callback function to execute next
  * @returns {object} returns user object
  */
exports.getUserFromReq = (req, next) => {
  const username = exports.getUsernameFromReq(req, next);
  return User.findOne({ username });
};

/**
  * This function is a middleware function to check authentication.
  * @method checkAuth
  * @param {object} req request object
  * @param {object} res response object
  * @param {object} next callback function to execute next
  * @returns {boolean}
  */
exports.checkAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token in util.checkAuth'));
    return null;
  }
  try {
    const username = decode(token).username;
    next();
    return true;
  } catch (e) {
    next(new Error('Invalid Token!'));
    return null;
  }
};

/**
  * This function is used to check if a user is real user in the database.
  * @method checkIsRealUser
  * @param {string} username username
  * @param {object} callback callback function to execute
  * @returns {boolean}
  */
exports.checkIsRealUser = (username, callback) => {
  User.find({}, (err, result) => {
    const allUsers = result.map(userEntry => (userEntry.username));

    if (allUsers.indexOf(username) < 0) {
      callback(err, false);
    } else {
      callback(err, true);
    }
  });
};



exports.getMoveItems = (move_id) => {
  return new Promimse( (resolve, reject) => {
    Item.find({move_id:move_id}).sort({createdAt:-1}).exec().then( moveItems => {
      resolve(moveItems);
    },
    err => {
      console.log('getMoveItems err', err);
      reject(err);
    });
  });
}

exports.getUserMoves = (user_id) => {
  return new Promimse( (resolve, reject) => {
    Move.find({user_id})
    .sort({createdAt:-1})
    .exec().then(
      moves => {
        resolve(moves);
      },
      err => {
        console.log('getUserMoves err', err);
        reject(err);
      }
    );
  });
}

exports.getLastMove = (user_id) => {
  return exports.getUserMoves(user_id).then( moves => {
    if (moves.length === 0) {
      return null;
    }
    return moves[moves.length - 1];
  });
}

exports.findItemAndUpdate = (item) => {
  //const query = Item.where({_id: item._id});
  //return Item.findOneAndUpdate(query, item).exec().then( updatedItem => {
  //return query.update({$set: item}).exec().then( updatedItem => {
  return Item.findById(item._id).exec().then( retrievedItem => {
    Object.assign(retrievedItem, item);
    retrievedItem.save();
    return retrievedItem;
  }).catch( err => {
    console.log('findItemAndUpdate err', err);
    throw err;
  });
}


// exports.fixMovePopulate = (move) => {
//   move.username = move.user_id.username;
//   move.user_id = move.user_id._id;
//   return move;
// }

