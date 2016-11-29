/**
 * @file This is the server-side controller for the Message
 */

/** @module Message Controller */
const Promise = require('bluebird');
const Message = require('./messageModel');
const dbUtil = require('./../dbUtil');



exports.handleNewMessage = (req, res, next) => {
  const source_id = dbUtil.getUserIdFromReq(req);
  const messageObj = {
    source_id,
    destination_id: req.body.destination_id,
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
  const source_id = dbUtil.getUserIdFromReq(req);
  const destination_id = req.body.destination_id;

  //look it up both ways
  const sourcePromise = Message.find({destination_id: destination_id, source_id: source_id});
  const destinationPromise = Message.find({source_id: destination_id, destination_id: source_id});

  Promise.all([sourcePromise, destinationPromise]).then( result => {

    const messages1 = result[0] || [];
    const messages2 = result[1] || [];
    const messages = messages1.concat(messages2);

    messages.sort( (a, b) => {
      return Date(a.createdAt) - Date(b.createdAt);
    });
    res.send({messages});
  });
}

