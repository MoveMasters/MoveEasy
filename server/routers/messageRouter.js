const express = require('express');
const messageController = require('./../db/messages/messageController');


const router = new express.Router();

router.post('/newMessage', messageController.handleNewMessage);
router.get('/conversation', messageController.getConversation);



module.exports = router;