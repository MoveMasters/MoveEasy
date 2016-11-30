/**
 * @file This is the server-side controller for the Users
 */

/** @module User Controller */

const jwt = require('jwt-simple');
const dbUtil = require('./../dbUtil.js');
const generalUser = require('./generalUserModel');

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
    const company = req.body.company;
    const name = req.body.name;


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
          name,
          company
        });
      })
      .then((user) => {
        //Create a session token and send back for authorization 
        dbUtil.encodeSendUser(user, res);
      })
      .fail((error) => {
        next(error);
      });
  }
};
