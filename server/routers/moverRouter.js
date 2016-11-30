const express = require('express');
const moverController = require('./../db/movers/moverController');


const router = new express.Router();

router.post('/signup', moverController.signup);
router.post('/signin', moverController.signin);
router.get('/contacts', moverController.getContacts);



module.exports = router;