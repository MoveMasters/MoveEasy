/**
 * @file This is the server-side controller for the Items
 */

/** @module Item Controller */
const Item = require('./itemModel.js');
const imageUtil = require('./../imageUtil');
const dbUtil = require('./../dbUtil');



exports.handleNewItem = (req, res, next) => {
  var photoData = req.body.image;
  photoData = photoData.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");
  const filePath = __dirname + '/../../images/logo.png';
  const move_id = req.cookies.moveId || req.body.moveId;

  imageUtil.saveAndUpload(filePath, photoData)
  .then((imageUrl) =>{
    const itemObj = {
      url: imageUrl,
      move_id: move_id,
      name: req.body.name,
      room: req.body.room,
      cft: req.body.cft,
      pbo: req.body.pbo,
      quantity: req.body.quantity,
      going: req.body.going,
      comment: req.body.comment
    };
    Item.create(itemObj).then( newItem => {
      dbUtil.getMoveItems(move_id).then( moveItems => {
        res.send({moveItems});
      });
    }).catch( err => {
      console.log('Creating new item err', err);
      throw err;
    });
  }, err => {
    res.status(505).end('S3 network error!');
  }).catch( err => {
    console.log('handleNewItem err', err);
    throw err;
  });
};

exports.handleMoveItems = (req, res, next) => {
  const move_id = req.cookies.moveId || req.query.moveId;
  dbUtil.getMoveItems(move_id).then( moveItems => {
    res.send({moveItems});
  }).catch( err => {
    console.log('handleMoveItems err', err);
    throw err;
  });
}


exports.handleUpdateItem = (req, res, next) => {
  const item = req.body.item;
  dbUtil.findItemAndUpdate(item).then(item => {
    res.send({item});
  }).catch( err => {
    console.log('handleUpdateItem err', err);
    throw err;
  });
}


exports.handleDeleteItem = (req, res, next) => {
  const item = req.body.item;
  return Item.findOneAndRemove({_id: item._id}).then( deletedItem => {
    return deletedItem;
  }).catch( err => {
    console.log('handleDeleteItem err', err);
    throw err;
  });

}