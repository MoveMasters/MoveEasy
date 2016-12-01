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
  const token = req.headers['x-access-token'] || req.cookies['x-access-token'];
  if (!token) {
    throw new Error('No token');
  }
  return decode(token);
};

exports.decodeUserFromHeader = decodeUserFromHeader;



const fixMovePopulate = (move) => {
  //fix the join table
  //if user_id not a valid reference, error out
  if(!move.user_id) {
    throw new Error('User id undefined for move ' + move._id);
  }
  move.username = move.user_id.username;
  move.name = move.user_id.name;
  move.user_id = move.user_id._id;
  return move;
}

exports.fixMovePopulate = fixMovePopulate;



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
    .populate('user_id')
    .exec().then(
      moves => {
        moves.forEach(fixMovePopulate);
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

exports.getMoveFromId = (move_id) => {
  return Move.findOne({_id: move_id})
  .populate('user_id')
  .exec().then( move => {
    return fixMovePopulate(move);
  })
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

exports.getCompanyFromLastMove = (user_id) => {
  return exports.getLastMove(user_id).then( move => {
    if(!move) {
      return null;
    }
    return move.company;
  });
}


exports.findCompanyContacts = (company) => {
  return Move.find({company}).exec().then( moves => {
    userIds = new Set();
    moves.forEach( move => {
      userIds.add(String(move.user_id));
    });

    // Not sure about adding the move
    var userPromises = [];
    userIds.forEach( userId => {
      userPromises.push(User.findOne({_id: userId}).exec());
    });

    return Promise.all(userPromises).then( users => {
      //not sure why some are coming out as null, maybe the IDs were for Movers
      users = users.filter( user => { return !!user; });
      return users;
    })

  });
}

exports.updateUserMoveInfo = (req, res, next) => {
  const user_id = req.body.user_id || req.body.userId;
  const move_id = req.body._id;


  const userFind = User.findOne({_id: user_id}).exec();
  const moveFind = Move.findOne({_id: move_id}).exec();
  Promise.all([userFind, moveFind]).then( results => {
    const user = results[0];
    const move = results[1];

    if(!user) {
      res.status(503).end('Could not get user with id ' + user_id);
      return;
    }

    if(!move) {
      res.status(503).end('Could not get move with id ' + move_id);
      return;
    }

    //only can update name for user
    var promises = [];
    if (user.name != req.body.name) {
      user.name = req.body.name;
      promises.push(user.save());
    }
    //recreate the move obj
    var moveFromBody = req.body;
    moveFromBody.user_id = user_id;

    Object.assign(move, moveFromBody);
    promises.push(move.save());

    Promise.all(promises).then((response) => {
      res.send(response[1]);
    });
  });
}





