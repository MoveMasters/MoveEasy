/**
 * @file This is the server-side controller for the Users
 */

/** @module User Controller */

const User = require('./userModel');
const gUController = require('./../generalUsers/generalUserController');
const dbUtil = require('./../dbUtil');



//users the general user controller with our User model
module.exports = {
  signin(req, res, next) {
    return gUController.signin(User, req, res, next);
  },
  signup(req, res, next) {
    return gUController.signup(User, req, res, next);
  }
};
