/**
 * @file This is the server-side controller for the Message
 */

/** @module Message Controller */
const Promise = require('bluebird');
const Message = require('./messageModel');
const dbUtil = require('./../dbUtil');




const fixMessagePopulate = (message) => {
  //replace the mover_id and user_id info

  message.customerName = message.user_id.name;

  //if sent by user, no mover_id
  if(!!message.mover_id) {
    const mover_id = message.mover_id._id;
    message.moverName = message.mover_id.name;
    message.mover_id = mover_id;
  }
  return message 
}


const getConversation = (user_id, company) => {
  return Message.find({user_id, company})
  .sort({createdAt:-1})
  .populate('mover_id')
  .populate('user_id')
  .exec().then( messages => {
    messages = messages.map(fixMessagePopulate);
    return messages;
  });
}



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
    //add value
    newMessage.moverName = mover.name;
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

  getConversation(user_id, company).then( messages => {
    res.send({messages});
  });
};

exports.getConversationForMover = (req, res, next) => {


  const user_id = req.query.userId || req.cookies.userId ;
  const mover = dbUtil.decodeUserFromHeader(req);
  const company = mover.company;

  getConversation(user_id, company).then( messages => {
    res.send({messages});
  });
};


