/**
 * @file This is the server-side controller for the Users
 */

/** @module User Controller */

const User = require('./userModel.js');
const gUController = require('./../generalUsers/generalUserController.js');
const dbUtil = require('./../dbUtil.js');



//users the general user controller with our User model
module.exports = {
  signin(req, res, next) {
    return gUController.signin(User, req, res, next);
  },
  signup(req, res, next) {
    return gUController.signup(User, req, res, next);
  },
  checkAuth(req, res, next) {
    return gUController.checkAuth(User, req, res, next);
  }
};
