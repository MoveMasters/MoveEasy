const express = require('express');
const authController = require('./../db/authController');


const router = new express.Router();

router.get('/clarifaiInfo', authController.checkMoverAuth, authController.sendClarifaiInfo);


module.exports = router;