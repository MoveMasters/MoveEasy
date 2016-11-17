const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server');
const jwt = require('jwt-simple');
const DataUri = require('datauri').promise;
const moveController = require('./../db/moves/moveController');
const testUtil = require('./testUtil');

const request = supertest.agent(server);

const userObj1 = testUtil.userObj1;



describe('Move Server APIs', () => {
  var user_id;
  var move_id;
  before((done) => {
    testUtil.clearDatabase().then(done);
  });

  it('Should create a new move', (done) => {
    testUtil.signupUser1CreateMove1(request).then( items => {
      const user = items[0];
      const move = items[1];
      user_id = String(user._id);
      move_id = String(move._id)
      expect(user_id).to.equal(String(move.user_id));
      done();
    });
  });

  it('Should find existing move for exiting user', (done) => {
    request.post('/api/user/signin')
      .send(userObj1)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.lastMove.user_id).to.equal(user_id);
        done();
      });
  });
});





    