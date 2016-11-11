/**
 * @file This is where the routing middleware is located
 */

/** @module Middleware */

const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app, express) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '/../')));
};
