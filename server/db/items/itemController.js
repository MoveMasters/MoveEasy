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
      const result = response.data.outputs[0].data.concepts;
      var data = {conecpts: result, url: imageUrl}
      //console.log('result', result);
      res.send(result);
    },
    (err) => {
      console.error('err', err);
      res.status(500).end();
    }
  );
};