const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const User = require('./../db/users/userModel.js');
const jwt = require('jwt-simple');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);



describe('User Server API tests', () => {
  var token;
  var decodedToken;
  var decodedToken2;
  var username = 'test';
  var password = 'testword';
  var username2 = 'user';
  var password2 = 'userword';


  before((done) => {
    testUtil.clearDatabase()
    .then(done);
  });



  it('Should respond with a token on valid sign up', (done) => {
    request.post('/api/user/signup')
      .send({ username: username, password: password }).end( (err, res) => {
        token = res.body.token;
        decodedToken = dbUtil.decode(token);
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });


  it('Should attach a token for a login post', (done) => {
    request.post('/api/user/signin')
      .send({ username: username, password: password }).end( (err, res) => {
        const testDecoded = dbUtil.decode(res.body.token);
        expect(res.status).to.equal(200);
        expect(testDecoded.username).to.equal(username);
        done();
      });
  });

  it('Should 403 on invalid user', (done) => {
  request.post('/api/user/signin')
    .send({ username: 'anotherUser', password: password })
    .end(function(err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });


  it('Should 403 on invalid password', (done) => {
    request.post('/api/user/signin')
    .send({ username: username, password: 'wrongpassword' })
    .end(function(err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });


  it('Should find the user with the database with a matching token in the session', (done) => {
    User.findOne({ username: username})
      .exec((err, user) => {
        if (err) {
          console.error(err);
        }
        //token from sigin in
        expect(decodedToken.username).to.equal(username);
        done();
      });
  });


  it('Should sign up a second user', (done) => {
    request.post('/api/user/signup')
      .send({ username: username2, password: password2 }).end( (err, res) => {
        decodedToken2 = dbUtil.decode(res.body.token);
        expect(decodedToken2.username).to.equal(username2);
        done();
      });
  });

});
