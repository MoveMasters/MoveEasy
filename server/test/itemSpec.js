const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const jwt = require('jwt-simple');
const DataUri = require('datauri').promise;
const itemController = require('./../db/items/itemController');
const testUtil = require('./testUtil');

const request = supertest.agent(server);




describe('Item Server APIs', () => {
  var user;
  var move;

  before((done) => {
    testUtil.clearToMove1(request).then( data => {
      user = data[0];
      move = data[1];
      done();
    });
  });

  it('Should add an item', (done) => {
    const clientItemObj = testUtil.getClientItemObj1(move._id);
    request.post('/api/item/newItem')
    .send(clientItemObj)
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  }).timeout(3000);


});
    