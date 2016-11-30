const express = require('express');
const messageController = require('./../db/messages/messageController');
const authController = require('./../db/authController');


const router = new express.Router();

router.post('/newMessageFromUser', authController.checkUserAuth, messageController.handleNewMessageFromUser);
router.post('/newMessageFromMover', authController.checkMoverAuth, messageController.handleNewMessageFromMover);
router.get('/conversationForUser', authController.checkUserAuth, messageController.getConversationForUser);
router.get('/conversationForMover', authController.checkMoverAuth, messageController.getConversationForMover);



module.exports = router;