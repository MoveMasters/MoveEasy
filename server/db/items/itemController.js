/**
 * @file This is the server-side controller for the Items
 */

/** @module Item Controller */

const Item = require('./itemModel.js');
const imageUtil = require('./../imageUtil.js');



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