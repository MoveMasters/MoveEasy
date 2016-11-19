const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const authController = require('./../db/authController');
const testUtil = require('./testUtil');

const request = supertest.agent(server);


describe('Meta Testing', () => {
  it('Should be a functioning test', () => {
    expect(true).to.equal(true);
  });
});



describe('Auth Server APIs', () => {
  
  before((done) => {
    testUtil.clearDatabase().then(done);
  });

  it('Should send auth token and other info for Clarifai', (done) => {
    request.get('/api/auth/clarifaiInfo')
    .send().end( (err, res) => {
      expect(res.body.clarifaiToken).to.not.be.null;
      expect(res.status).to.equal(200);
      done();
    });
  });
});
    