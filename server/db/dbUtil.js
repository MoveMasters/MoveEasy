/**
 * @file This has all the server-side utility functions needed to check authentication, get userID, etc
 */

/** @module Authentication Utility Server-Side Functions */

const jwt = require('jwt-simple');
const GeneralUser = require('./generalUsers/generalUserModel');
const User = require('./users/userModel');
const Item = require('./items/itemModel');
const Move = require('./moves/moveModel');
const Message = require('./messages/messageModel');
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


const decodeUserFromHeader = (req) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new Error('No token');
  }
  return decode(token);
};

exports.decodeUserFromHeader = decodeUserFromHeader;



const fixMovePopulate = (move) => {
  // move.username = move.user_id.username;
  // move.user_id = move.user_id._id;
  // return move

  // Can't get the normal way to work
  // Using this instead
  return  {
    _id: move._id,
    createdAt: move.createdAt,
    user_id: move.user_id._id,
    username: move.user_id.username,
    name: move.name,
    phone: move.phone,
    currentAddress: move.currentAddress,
    futureAddress: move.futureAddress,
    surveyTime: move.surveyTime
  }
}


exports.encodeSendUser = (user, res) => {
  const token = encode(user);
  //only send over the move for non-movers
  res.cookie('x-access-token', token);
  if (user.__t === 'Mover') {
    res.json({token});
  } else {
    exports.getLastMove(user._id).then( lastMove => {
      res.json({ token, lastMove});
    });
  }
};



exports.getUserIdFromReq = (req) => {
  const user = decodeUserFromHeader(req);
  return user._id;
}



exports.getCompanyFromReq = (req) => {
  const mover = decodeUserFromHeader(req);
  return mover.company;
}

/**
  * This function is used to get the username from the request object.
  * @method getUsernameFromReq
  * @param {object} req req object
  * @param {object} next callback function to execute next
  */
exports.getUsernameFromReq = (req) => {
  const user = decodeUserFromHeader(req);
  return user.username;
};

/**
  * This function is used to get the user from the database.
  * @method getUserFromReq
  * @param {object} req req object
  * @param {object} next callback function to execute next
  * @returns {object} returns user object
  */
exports.getUserFromReq = (req) => {
  const username = exports.getUsernameFromReq(req);
  return GeneralUser.findOne({ username });
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



exports.getMoveItems = (move_id) => {
  console.log('calling get move items')
  return new Promimse( (resolve, reject) => {
    Item.find({move_id:move_id}).sort({createdAt:-1}).exec().then( moveItems => {
      console.log(move_id, moveItems, 'from getMoveItems')
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
    .populate('user_id')
    .exec().then(
      moves => {
        moves = moves.map(fixMovePopulate);
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


exports.findCompanyContacts = (company) => {
  return Message.find({company}).exec().then( messages => {
    userIds = new Set();
    messages.forEach( message => {
      userIds.add(String(message.user_id));
    });
    var movePromises = [];
    userIds.forEach( userId => {
      movePromises.push(exports.getLastMove(userId));
    });
    return Promise.all(movePromises).then( moves => {
      return moves.filter( move => {return !!move});
    })
  });
}



