const express = require('express');
const itemController = require('./../db/items/itemController');
const authController = require('./../db/authController');


const router = new express.Router();

router.post('/newItem', authController.checkMoverAuth, itemController.handleNewItem);
router.post('/updateItem', authController.checkGenAuth, itemController.handleUpdateItem);
router.get('/moveItems', authController.checkGenAuth, itemController.handleMoveItems);


module.exports = router;