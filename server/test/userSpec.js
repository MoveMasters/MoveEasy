const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server.js');
const User = require('./../db/users/userModel');
const jwt = require('jwt-simple');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);

describe('User Server API tests', () => {
  let token1;
  let decodedToken1;
  let decodedToken2;

  const username1 = testUtil.userObj1.username;
  const name1 = testUtil.userObj1.name;

  const username2 = testUtil.userObj2.username;
  const name2 = testUtil.userObj2.name;


  before((done) => {
    testUtil.clearDatabase()
    .then(done);
  });


  it('Should respond with a token on valid sign up', (done) => {
    testUtil.signupUser1(request).then( user => {
      token1 = user.token;
      decodedToken1 = dbUtil.decode(token1);
      expect(decodedToken1.username).to.equal(username1);
      expect(decodedToken1.name).to.equal(name1);
      done();
    });
  });


  it('Should attach a token for a login post', (done) => {
    testUtil.signinUser1(request).then( user => {
      decodedToken1 = dbUtil.decode(user.token);
      expect(decodedToken1.username).to.equal(username1);
      expect(decodedToken1.name).to.equal(name1);
      done();
    });
  });

  it('Should 403 on invalid user', (done) => {
    request.post('/api/user/signin')
    .send({ username: 'anotherUser', password: 'asfsa'})
    .end(function(err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });


  it('Should 403 on invalid password', (done) => {
    request.post('/api/user/signin')
    .send({ username: username1, password: 'wrongpassword' })
    .end(function(err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });


  it('Should find the user with the database with a matching token in the session', (done) => {
    User.findOne({ username: username1})
      .exec((err, user) => {
        if (err) {
          console.error(err);
        }
        //token from sigin in
        expect(decodedToken1.username).to.equal(username1);
        done();
      });
  });


  it('Should sign up a second user', (done) => {
    testUtil.signupUser2(request).then( user => {
      token2 = user.token;
      decodedToken2 = dbUtil.decode(token2);
      expect(decodedToken2.username).to.equal(username2);
      expect(decodedToken2.name).to.equal(name2);
      done();
    });
  });

});
