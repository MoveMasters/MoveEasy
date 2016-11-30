const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const authController = require('./../db/authController');
const testUtil = require('./testUtil');

const request = supertest.agent(server);



describe('Auth Server APIs', () => {

  let moverToken;
  
  before( function(done) {
    this.timeout(3000);
    testUtil.clearDatabase().then( () => {
      testUtil.signupMover1(request).then( mover => {
        moverToken = mover.token;
        done();
      })
    });
  });

  it('Should send auth token and other info for Clarifai', (done) => {
    request.get('/api/auth/clarifaiInfo')
    .set('x-access-token', moverToken)
    .end( (err, res) => {
      expect(res.body.clarifaiToken).to.not.be.null;
      expect(res.status).to.equal(200);
      done();
    });
  });
});
    