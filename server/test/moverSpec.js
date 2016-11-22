const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const Mover = require('./../db/movers/moverModel.js');
const jwt = require('jwt-simple');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);



describe('Mover Server API tests', () => {

  var token;
  var decodedToken;
  var username = 'mover';
  var password = 'moverpassword';

  before((done) => {
    testUtil.clearDatabase()
    .then(done);
  });


  it('Should respond with a token on valid sign up', (done) => {
    request.post('/api/mover/signup')
      .send({ username: username, password: password }).end( (err, res) => {
        token = res.body.token;
        decodedToken = dbUtil.decode(token);
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });
});
