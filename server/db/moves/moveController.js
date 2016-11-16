/**
 * @file This is the server-side controller for the Moves
 */

/** @module Move Controller */

const Move = require('./moveModel.js');
const dbUtil = require('./../dbUtil.js');



exports.handleNewMove = (req, res, next) => {
  dbUtil.getUserFromReq(req, next).then( user => {
    const moveObj = {
      user_id: user.id,
      name: req.body.name,
      phone: req.body.phone,
      currentAddress: req.body.currentAddress,
      futureAddress: req.body.futureAddress
    };
    Move.create(moveObj).then( newMove => {
      res.send(newMove);
    });
  });
};