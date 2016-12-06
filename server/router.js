'use strict'
const path = require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
const itemRouter = require('./routers/itemRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const moveRouter = require('./routers/moveRouter');
const moverRouter = require('./routers/moverRouter');
const messageRouter = require('./routers/messageRouter');


const isDev = process.env.DEV ? 1 : 0;


module.exports = (app, express, server) => {

  app.use('/', express.static(path.join(__dirname, '/../client/dist')));
  app.use('/home', express.static(path.join(__dirname, '/../landingPage')));


  app.use('/api/user', userRouter);
  app.use('/api/item', itemRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/move', moveRouter);
  app.use('/api/mover', moverRouter);
  app.use('/api/message', messageRouter);

  app.get('/*', function (req, res) {
    res
    .cookie('MoveKickDev', isDev)
    .sendFile(path.join(__dirname, '/../client/dist/index.html'));
  });

};
