const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server');
const jwt = require('jwt-simple');
const DataUri = require('datauri').promise;
const moveController = require('./../db/moves/moveController');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);

const userObj1 = testUtil.userObj1;



describe('Move Server APIs', () => {
  let user_id;
  let move_id;
  let company;
  let mover_id1;
  let moverToken1;
  let moverName1;
  let moveObj;

  before((done) => {
    testUtil.clearDatabase().then(done);
  });


  it('Should create a new move', (done) => {
    testUtil.setupMove1(request).then( items => {
      const user = items[0];
      const mover = items[1];
      const move = items[2];

      //latch variables
      company = mover.company;
      mover_id1 = mover._id;
      moverToken1 = mover.token;
      moverName1 = mover.name;

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

  it('Should grab the move with the move id for mover', (done) => {
    request.get('/api/move/existingMove')
    .set('cookies', `moveId=${move_id}`)
    .set('x-access-token', moverToken1)
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
      const user_id2 = String(user._id);
      const move_id2 = String(move._id);
      expect(user_id2).to.equal(String(move.user_id));
      done();
    });
  });


  it('Should get all pending moves', (done) => {
    request.get('/api/move/pendingMoves')
    .set('x-access-token', moverToken1)
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.moves.length).to.equal(2);
      done();
    });
  });


  it('Should get last user move', (done) => {
    request.get('/api/move/lastMoveByUserId')
    .set('cookies', `userId=${user_id}`)
    .set('x-access-token', moverToken1)
    .end(function(err, res) {
      moveObj = res.body.move;
      expect(res.status).to.equal(200);
      expect(moveObj._id).to.equal(moveObj._id);
      console.log('username in check', moveObj.username)
      expect(moveObj.username).to.equal(userObj1.username);
      done();
    });
  });


 it('Should update the user and move info', (done) => {
    //modify the move obj we grabbed before
    const newName = 'New Name';
    const newAddress = 'New Address';

    moveObj.name = newName;
    moveObj.futureAddress = newAddress;

    //send it back and see if it got updated from the DB
    request.post('/api/move/updateUserMoveInfo')
    .set('x-access-token', moverToken1)
    .send(moveObj)
    .end( (err, res) => {
      //load from DB check if OK
      dbUtil.getMoveFromId(moveObj._id).then( retrievedMove => {
        expect(retrievedMove.name).to.equal(newName);
        expect(retrievedMove.futureAddress).to.equal(newAddress);
        done();
      });
    });
 }).timeout(3000);



  //maybe move to the mover spec but it requires more setup
  it('Should load contacts for the mover', (done) => {
    request.get('/api/mover/contacts')
    .set('x-access-token', moverToken1)
    .end( (err, res) => {
      const contacts = res.body.contacts;
      expect(contacts.length).to.equal(2);
      expect(contacts[0].username).to.equal(userObj1.username);
      done();
    });
  });

});






    