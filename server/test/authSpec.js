const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const authController = require('./../db/authController');

const request = supertest.agent(server);


describe('Meta Testing', () => {
  it('Should be a functioning test', () => {
    expect(true).to.equal(true);
  });
});



describe('Auth Server APIs', () => {
  it('Should send auth token for Clarifai', (done) => {
    setTimeout( () => {
      request.get('/api/auth/clarifaiToken')
      .send().end( (err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    }, 200);
  });
});
    