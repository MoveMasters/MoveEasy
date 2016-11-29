/**
 * @file This is the server-side controller for the Movers
 */

/** @module Mover Controller */

const Mover = require('./moverModel.js');
const gUController = require('./../generalUsers/generalUserController');
const dbUtil = require('./../dbUtil');




//users the general user controller with our Mover model
module.exports = {
  signin(req, res, next) {
    return gUController.signin(Mover, req, res, next);
  },
  signup(req, res, next) {
    return gUController.signup(Mover, req, res, next);
  },
  checkAuth(req, res, next) {
    return gUController.checkAuth(Mover, req, res, next);
  }
};
