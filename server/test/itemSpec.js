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
  let mover;
  let move;
  let item;

  before( function(done) {
    this.timeout(3000);
    testUtil.clearSetupMove1(request).then( data => {
      user = data[0];
      mover = data[1];
      move = data[2];
      done();
    });
  });

  it('Should add an item from mover', (done) => {
    const clientItemObj = testUtil.getClientItemObj1(move._id);
    request.post('/api/item/newItem')
    .set('x-access-token', mover.token)
    .send(clientItemObj)
    .end( (err, res) => {
      expect(res.status).to.equal(200);
      item = res.body.moveItems[0];
      expect(item.name).to.equal(testUtil.itemName1);
      done();
    });
  }).timeout(3000);

  it('Should update item from user', (done) => {
    item.going = false;
    request.post('/api/item/updateItem')
    .set('x-access-token', user.token)
    .send({item})
    .end( (err, res) => {
      item = res.body.item;
      expect(res.status).to.equal(200);
      expect(item.going).to.equal(false);
      done();
    });
  });

});
    