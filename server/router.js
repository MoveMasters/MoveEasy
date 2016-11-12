'use strict'
const path = require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
const itemRouter = require('./routers/itemRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');


module.exports = (app, express, server) => {

  app.use('/', ExpressPeerServer(server, {debug: true}));


  app.use('/api/user', userRouter);
  app.use('/api/item', itemRouter);
  app.use('/api/auth', authRouter);




  // app.get('/transferee', (request, response) => {
  //   //response.sendFile(path.resolve('client/index.html'));
  // });

  // app.get('/mover', (request, response) => {
  //   //response.sendFile(path.resolve('client/index.html'));
  // });

  // //app.post('/api/croppedImage', dbutil.checkAuth, itemController.handleCroppedImage);



};
