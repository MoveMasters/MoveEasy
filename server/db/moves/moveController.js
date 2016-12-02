/**
 * @file This is the server-side controller for the Moves
 */

/** @module Move Controller */

const Move = require('./moveModel');
const dbUtil = require('./../dbUtil');



exports.handleNewMove = (req, res, next) => {
  company = req.body.company || 'MoveKick';
  dbUtil.getUserFromReq(req, next).then( user => {
    const moveObj = {
      user_id: user.id,
      phone: req.body.phone,
      company: company,
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

const filterMoves = (moves) => {
  var output = [];
  moves.forEach( move => {
    if(move.user_id) {
      move = dbUtil.fixMovePopulate(move);
      output.push(move);
    }
  });
  return output;
}


exports.getAllMoves = (req, res, next) => {
  Move.find()
  .populate('user_id')
  .exec().then(moves => {
    moves = filterMoves(moves);
    console.log('moves', moves);
    res.send({moves});
  });
};


exports.getLastMoveByUserId = (req, res, next) => {
  const user_id = req.cookies.userId || req.query.userId;
  dbUtil.getLastMove(user_id).then( move => {
    res.send({move});
  }).catch( err => {
    console.log('getLastMoveByUserId err', err);
    throw err;
  });
};


exports.getExistingMove = (req, res, next) => {
  //mutliple sources for moveId
  const move_id = req.cookies.moveId || req.body.moveId;
  Move.findOne({_id: move_id})
    .populate('user_id')
    .exec().then( move => {
      move = dbUtil.fixMovePopulate(move);
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


exports.updateUserMoveInfo = (req, res, next) => {
  return dbUtil.updateUserMoveInfo(req, res, next);
}