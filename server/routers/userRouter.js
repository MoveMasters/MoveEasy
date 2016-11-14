const express = require('express');
const dbUtil = require('./../db/dbUtil');
const userController = require('./../db/users/userController');


const router = new express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);



module.exports = router;