const express = require('express');
const dbUtil = require('./../db/dbUtil');
const moveController = require('./../db/moves/moveController');


const router = new express.Router();

router.post('/newMove', moveController.handleNewMove);


module.exports = router;