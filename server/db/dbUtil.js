/**
 * @file This has all the server-side utility functions needed to check authentication, get userID, etc
 */

/** @module Authentication Utility Server-Side Functions */

const jwt = require('jwt-simple');
const User = require('./users/userModel.js');

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
  const username = jwt.decode(token, 'secret').username;
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
    const username = jwt.decode(token, 'secret').username;
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


