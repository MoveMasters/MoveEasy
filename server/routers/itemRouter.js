const express = require('express');
const itemController = require('./../db/items/itemController');


const router = new express.Router();

router.post('/newItem', itemController.handleNewItem);
router.post('/updateItem', itemController.handleUpdateItem);
router.get('/moveItems', itemController.handleMoveItems);


module.exports = router;