require('./db/mongooseInit')();

const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();
const testPort = process.env.TEST_PORT || 8000;
const prodPort = process.env.PORT || 9000;
const port = process.env.IS_TEST ? testPort : prodPort;
const options = {
  key: fs.readFileSync(__dirname + '/fake-keys/privatekey.pem'),
  cert: fs.readFileSync(__dirname + '/fake-keys/certificate.pem'),
};

// const server = app.listen(port);
let server;
if (process.env.LOCAL) {
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

server.listen(port, () => console.log('server up and running at %s port', port));

require('./sockets')(server);
require('./middleware')(app, express, server);
require('./router')(app, express, server);

module.exports = app;
