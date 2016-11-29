const express = require('express');
const moveController = require('./../db/moves/moveController');


const router = new express.Router();

router.post('/newMove', moveController.handleNewMove);
router.get('/allMoves', moveController.getAllMoves);
router.get('/pendingMoves', moveController.getPendingMoves);
router.get('/existingMove', moveController.getExistingMove);
router.get('/lastMoveByUserId', moveController.getLastMoveByUserId);




module.exports = router;