const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const jwt = require('jwt-simple');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);



describe('Mover Server API tests', () => {

  let token;
  let decodedToken;
  const username = 'mover';
  const password = 'moverpassword';
  const name = 'James Harden';
  const email = 'jharden@gmail.com';
  const company = 'Hack Reactor';

  const moverObj = {
    company,
    username,
    password,
    name
  }

  before((done) => {
    testUtil.clearDatabase()
    .then(done);
  });


  it('Should respond with a token on valid sign up', (done) => {
    request.post('/api/mover/signup')
      .send(moverObj).end( (err, res) => {
        token = res.body.token;
        decodedToken = dbUtil.decode(token);
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });
});
