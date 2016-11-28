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
      futureAddress: req.body.futureAddress,
      surveyTime: req.body.surveyTime
    };
    Move.create(moveObj).then( newMove => {
      res.send(newMove);
    }).catch( err => {
      console.log('handleNewMove err', err);
      throw err;
    });
  });
};


exports.getAllMoves = (req, res, next) => {
  Move.find().exec().then(moves => {
    res.send({moves});
  });
};

exports.getExistingMove = (req, res, next) => {
  const move_id = req.cookies.moveId;
  Move.findOne({_id: move_id})
    .exec().then( move => {
      res.send({move});
  }).catch( err => {
    console.log('handleNewMove err', err);
    throw err;
  });
};


exports.getPendingMoves = (req, res, next) => {
  Move.find({moveComplete: false})
    .exec().then( moves => {
      res.send({moves});
  }).catch( err => {
    console.log('getPendingMoves err', err);
    throw err;
  });
};