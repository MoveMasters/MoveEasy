const express = require('express');
const dbUtil = require('./../db/dbUtil');
const itemController = require('./../db/items/itemController');


const router = new express.Router();

//router.post('/croppedImage', itemController.handleCroppedImage);
router.post('/newItem', itemController.handleNewItem);


module.exports = router;