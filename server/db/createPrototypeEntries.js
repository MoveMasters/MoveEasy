const mongoose = require('./mongooseInit')();
const Promise = require('bluebird');
const itemPrototype = require('./itemPrototypes/itemPrototypeModel');
const readItemJson = require('./../imageTrainer/readItemJson');



var createPrototypes = () => {
  const total = process.env.numItems || -1;
  const options = {total: total};
  const items = readItemJson(options);
  var creationPromises = [];
  items.forEach( item => {
    const itemPromise = itemPrototype.create(item);
    creationPromises.push(itemPromise);
  });
  Promise.all(creationPromises).then( results => {
    console.log('Prototype creation succeeds!', results);
  })
  .fail( err => {
    console.log('Error creating protypes', err);
  });
}




itemPrototype.remove().then( () => {
  return createPrototypes();
});