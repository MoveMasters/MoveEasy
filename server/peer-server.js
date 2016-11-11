/**
 * @file This is the server
 */

/** @module Server */

require('./db/mongooseInit')();

const express = require('express');
const app = express();


const port = process.env.PORT || 9000;
const server = app.listen(port);

console.log('listening on port', port);

require('./middleware')(app, express, server);
require('./router')(app, express, server);


module.exports = app;




