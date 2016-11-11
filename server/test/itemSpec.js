const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../peer-server.js');
const jwt = require('jwt-simple');
const DataUri = require('datauri').promise;
const itemController = require('./../db/items/itemController');

const request = supertest.agent(server);


describe('Meta Testing', () => {
  it('Should be a functioning test', () => {
    expect(true).to.equal(true);
  });
});



describe('Item Server APIs', () => {
  it('Should respond to image cropping', (done) => {
    DataUri('test/itemImage1.png').then( imageUri => {
      request.post('/api/item/croppedImage')
      .send({image: imageUri}).end( (err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  }).timeout(5000);;
});
    