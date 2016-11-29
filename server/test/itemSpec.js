const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const jwt = require('jwt-simple');
const DataUri = require('datauri').promise;
const itemController = require('./../db/items/itemController');
const testUtil = require('./testUtil');

const request = supertest.agent(server);




describe('Item Server APIs', () => {
  let user;
  let move;
  let item;

  before( function(done) {
    this.timeout(3000);
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
    .end( (err, res) => {
      item = res.body.moveItems[0];
      expect(res.status).to.equal(200);
      expect(item.name).to.equal(testUtil.itemName1);
      done();
    });
  }).timeout(3000);

  it('Should update item', (done) => {
    item.going = false;
    request.post('/api/item/updateItem')
    .send({item})
    .end( (err, res) => {
      item = res.body.item;
      expect(res.status).to.equal(200);
      expect(item.going).to.equal(false);
      done();
    });
  });

});
    