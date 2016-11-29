/**
 * @file This is the server-side controller for the Message
 */

/** @module Message Controller */
const Promise = require('bluebird');
const Message = require('./messageModel');
const dbUtil = require('./../dbUtil');



exports.handleNewMessage = (req, res, next) => {
  const user_id = dbUtil.getUserIdFromReq(req);
  const messageObj = {
    user_id,
    company: req.body.company,
    text: req.body.text
  };

  Message.create(messageObj).then( newMessage => {
    res.send(newMessage);
  }).catch( err => {
    console.log('hanldeNewMessage err', err);
    throw err;
  });
};

exports.getConversation = (req, res, next) => {
  const user_id = dbUtil.getUserIdFromReq(req);
  const company = req.body.company;

  Message.find({user_id, company})
  .sort({createdAt:-1})
  .exec().then( messages => {
    res.send({messages});
  });
}

