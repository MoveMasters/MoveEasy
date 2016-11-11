/**
 * @file This is the server-side controller for the Items
 */

/** @module Item Controller */

const Item = require('./itemModel.js');
const imageUtil = require('./../imageUtil.js');



exports.handleCroppedImage = (req, res, next) => {
  console.log('hit');
  var photoData = req.body.image;
  photoData = photoData.replace(/^data:image\/jpeg;base64,/, "");
  const filePath = 'images/logo.png';

  imageUtil.saveAndUpload(filePath, photoData)
  .then(imageUtil.predict)
  .then(
    (response) => {
      const result = response.data.outputs[0].data.concepts;
      console.log('result', result);
      res.send(result);
    },
    (err) => {
      console.error(err);
      res.status(500).end();
    }
  );
};