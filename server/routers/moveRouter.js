const express = require('express');
const moveController = require('./../db/moves/moveController');
const authController = require('./../db/authController');


const router = new express.Router();

router.post('/newMove', authController.checkGenAuth, moveController.handleNewMove);
router.get('/allMoves', authController.checkGenAuth, moveController.getAllMoves);
router.get('/pendingMoves', authController.checkGenAuth, moveController.getPendingMoves);
router.get('/existingMove', authController.checkGenAuth, moveController.getExistingMove);
router.get('/lastMoveByUserId', authController.checkGenAuth, moveController.getLastMoveByUserId);
router.post('/updateUserMoveInfo', authController.checkGenAuth, moveController.updateUserMoveInfo);




module.exports = router;