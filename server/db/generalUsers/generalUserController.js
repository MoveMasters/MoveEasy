/**
 * @file This is the server-side controller for the Users
 */

/** @module User Controller */

const jwt = require('jwt-simple');
const dbUtil = require('./../dbUtil.js');


module.exports = {

  /**
  * This function is used to signin a user if user exists in database and passwords match.
  * @method signin
  * @param {object} req request object
  * @param {object} res response object
  * @param {object} next callback function to execute
  * @returns {object} if user is found, returns the user token
  */
  signin(model, req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    model.findOne({ username }).exec()
      .then((user) => {
        if (!user) {
          return res.status(403).json({Error: 'No user exists'});
        }
        return user.comparePasswords(password)
          .then((foundUser) => {
            if (foundUser) {
              return dbUtil.encodeSendUser(user, res);
            }
            return res.status(403).json({Error: 'Wrong password'});
          });
      })
      .fail((error) => {
        next(error);
      });
  },

  /**
  * This function is used to signup a user if username doesn't exist in database .
  * @method signup
  * @param {object} req request object
  * @param {object} res response object
  * @param {object} next callback function to execute
  * @returns {object} if user is created successfully, returns the user token
  */
  signup(model, req, res, next) {

    const username = req.body.username;
    const password = req.body.password;


    //Check to see if username exists already 
    model.findOne({ username }).exec()
      .then((user) => {
        if (user) {
          //return next(new Error('User already ' + username + ' exist!'));
          const text = 'User already ' + username + ' exist!';
          res.status(500).send(text);
          return;
        }
        // Make a new user entry in database if username doesn't exist 
        return model.create({
          username,
          password,
        });
      })
      .then((user) => {
        //Create a session token and send back for authorization 
        dbUtil.encodeSendUser(user, res);
      })
      .fail((error) => {
        next(error);
      });
  },

  checkAuth(model, req, res, next) {

    /** Grab the token in the header, if any */
    const token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {

      /** Decode the token */
      const user = jwt.decode(token, 'secret');

      /** Check to see if that user exists in the database and respond with right status code */
      model.findOne({ username }).exec()
        .then((foundUser) => {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail((error) => {
          next(error);
        });
    }
  }

};
