const express = require('express');
const itemController = require('./../db/items/itemController');


const router = new express.Router();

router.post('/newItem', itemController.handleNewItem);


module.exports = router;