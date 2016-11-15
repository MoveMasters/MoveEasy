const express = require('express');
const authController = require('./../db/authController');


const router = new express.Router();

router.get('/clarifaiToken', authController.sendClarifaiToken);
router.get('/clarifaiInfo', authController.sendClarifaiInfo);


module.exports = router;