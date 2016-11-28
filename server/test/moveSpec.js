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
      move_id = String(move._id);
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

  it('Should grab the move with the move id', (done) => {
    request.get('/api/move/existingMove')
    .set('cookies', `moveId=${move_id}`)
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.move._id).to.equal(move_id);
      done();
    });
  });

    it('Should create a second user and move', (done) => {
    testUtil.signupUser2CreateMove2(request).then( items => {
      const user = items[0];
      const move = items[1];
      user_id = String(user._id);
      move_id = String(move._id);
      expect(user_id).to.equal(String(move.user_id));
      done();
    });
  });


  it('Should get all pending moves', (done) => {
    request.get('/api/move/pendingMoves')
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.moves.length).to.equal(2);
      done();
    });
  });

});






    