const express = require('express');
const messageController = require('./../db/messages/messageController');


const router = new express.Router();

router.post('/newMessageFromUser', messageController.handleNewMessageFromUser);
router.post('/newMessageFromMover', messageController.handleNewMessageFromMover);
router.get('/conversationForUser', messageController.getConversationForUser);
router.get('/conversationForMover', messageController.getConversationForMover);



module.exports = router;