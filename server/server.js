/**
 * @file This is the server
 */

/** @module Server */

require('./db/mongooseInit')();

const express = require('express');
const app = express();


const testPort = process.env.TEST_PORT || 8000;
const prodPort = process.env.PORT || 9000;
const port = process.env.IS_TEST ? testPort : prodPort;

const server = app.listen(port);

console.log('listening on port', port);

require('./middleware')(app, express, server);
require('./router')(app, express, server);

module.exports = app;




