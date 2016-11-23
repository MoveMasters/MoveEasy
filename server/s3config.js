'use strict';
const Upload = require('s3-uploader');
// const secret = require('./secret.js');

module.exports = new Upload('movekick', {
  aws: {
    path: 'images/',
    region: 'us-west-2',
    acl: 'public-read',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },

  cleanup: {
    versions: true,
    original: false,
  },

  original: {
    awsImageAcl: 'public-read',
  },
  versions: [
    {
      maxHeight: 1040,
      maxWidth: 1040,
      format: 'jpg',
      suffix: '-large',
      quality: 80,
      awsImageExpires: 31536000,
      awsImageMaxAge: 31536000,
    }
  ],
});
