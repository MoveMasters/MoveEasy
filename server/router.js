'use strict'
const path = require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
const itemRouter = require('./routers/itemRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const moveRouter = require('./routers/moveRouter');
const moverRouter = require('./routers/moverRouter');


module.exports = (app, express, server) => {

  app.use('/', ExpressPeerServer(server, {debug: true}));


  app.use('/api/user', userRouter);
  app.use('/api/item', itemRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/move', moveRouter);
  app.use('/api/mover', moverRouter);


};
