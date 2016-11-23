/**
 * @file This is where the routing middleware is located
 */

/** @module Middleware */
const cookie = require('cookie');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-sessions');


const parseCookies = (req, res, next) => {
  const cookieStr = req.headers.cookies || '';
  req.cookies = cookie.parse(cookieStr);
  next();
}
module.exports = (app, express) => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(morgan('dev'));
  app.use(parseCookies);
  //app.use(session({secret: '1234567890QWERTY'}));

  // app.use('/', express.static(path.join(__dirname, '/../clientV2/dist')));
};
