const express = require('express');
const authController = require('./../db/authController');


const router = new express.Router();

router.get('/clarifaiInfo', authController.sendClarifaiInfo);


module.exports = router;