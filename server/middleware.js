/**
 * @file This is where the routing middleware is located
 */

/** @module Middleware */
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-sessions');

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  //app.use(session({secret: '1234567890QWERTY'}));

  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '/../')));
};
