/**
 * @file This is the server-side controller for the Message
 */

/** @module Message Controller */
const Promise = require('bluebird');
const Message = require('./messageModel');
const dbUtil = require('./../dbUtil');



exports.handleNewMessageFromUser = (req, res, next) => {
  const user_id = dbUtil.getUserIdFromReq(req);
  const company = req.body.company || 'MoveKick';
  const messageObj = {
    user_id,
    company,
    text: req.body.text
  };


  Message.create(messageObj).then( newMessage => {
    res.send(newMessage);
  }).catch( err => {
    console.log('handleNewMessageFromUser err', err);
    throw err;
  });
};

exports.handleNewMessageFromMover = (req, res, next) => {
  const mover = dbUtil.decodeUserFromHeader(req);
  const company = mover.company;
  const mover_id=  mover._id;
  const user_id = req.body.userId;

  const messageObj = {
    user_id,
    mover_id,
    company,
    text: req.body.text
  };

  Message.create(messageObj).then( newMessage => {
    res.send(newMessage);
  }).catch( err => {
    console.log('handleNewMessageFromMover err', err);
    throw err;
  });
};



exports.getConversationForUser = (req, res, next) => {
  const user_id = dbUtil.getUserIdFromReq(req);
  //default for now
  const company = req.query.company || req.cookies.company || 'MoveKick';

  Message.find({user_id, company})
  .sort({createdAt:-1})
  .exec().then( messages => {
    res.send({messages});
  });
};

exports.getConversationForMover = (req, res, next) => {
  const user_id = req.query.userId || req.cookies.userId ;
  const mover = dbUtil.decodeUserFromHeader(req);
  const company = mover.company;

  Message.find({user_id, company})
  .sort({createdAt:-1})
  .exec().then( messages => {
    res.send({messages});
  });
};



exports.getContacts = (req, res, next) => {
    const mover = dbUtil.decodeUserFromHeader(req);
    const company = mover.company;
    dbUtil.findCompanyContacts(company)
    .then( contacts => {
      res.send({contacts});
    });
  }

