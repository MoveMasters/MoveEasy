/**
 * @file This is the server-side controller for the Items
 */

/** @module Item Controller */

const Item = require('./itemModel.js');
const imageUtil = require('./../imageUtil.js');
const dbUtil = require('./../dbUtil.js');



exports.handleCroppedImage = (req, res, next) => {
  var photoData = req.body.image;
  photoData = photoData.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");
  const filePath = 'images/logo.png';

  var imageUrl;
  imageUtil.saveAndUpload(filePath, photoData)
  .then((imageUrl) =>{
    console.log('url', imageUrl);
    return imageUtil.predict(imageUrl);
  })
  .then(
    (response) => {
      console.log('response', response);
      res.send(response);
    },
    (err) => {
      console.error('err', err);
      res.status(500).end();
    }
  );
};

exports.handleNewItem = (req, res, next) => {
  var photoData = req.body.image;
  photoData = photoData.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");
  const filePath = 'images/logo.png';

  //default
  imageUtil.saveAndUpload(filePath, photoData)
  .then((imageUrl) =>{
    console.log('url', imageUrl);
    const itemObj = {
      url: imageUrl,
      move_id: req.body.moveId,
      name: req.body.name,
      ctf: req.body.ctf,
      quantity: req.body.quantity,
      going: req.body.going,
      comment: req.body.comment
    };
    Item.create(itemObj).then( newItem => {
      //req.send(newItem);
      dbUtil.getMoveItems(move_id).then( moveItems => {
        res.send({moveItems});
      });
    });
  })
  .then(
    (response) => {
      console.log('response', response);
      res.send(response);
    },
    (err) => {
      console.error('err', err);
      res.status(500).end();
    }
  );
};