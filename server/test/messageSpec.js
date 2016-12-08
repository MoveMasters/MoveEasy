const expect = require('chai').expect;
const Promise = require('bluebird');
const supertest = require('supertest');
const server = require('./../server');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);


let username1, username2, userId1, userId2, token1, token2, customerName1, customerName2, company1, moverId1, moverToken1, moverName1;
const messageText1 = 'This is a message';
const messageText2 = 'Hello world';



describe('Message Server API tests', () => {


  before( function(done) {
    this.timeout(4000);

    testUtil.clearDatabase().then( () => { 
      Promise.all([
        testUtil.signupUser1(request), 
        testUtil.signupUser2(request), 
        testUtil.signupMover1(request)
      ])
      .then( result => {
        token1 = result[0].token;
        token2 = result[1].token;
        userId1 = result[0]._id;
        userId2 = result[1]._id;
        username1 = result[0].username;
        username2 = result[1].username;
        customerName1 = result[0].name;
        customerName2 = result[1].name;
        company1 = result[2].company;
        moverId1 = result[2]._id;
        moverToken1 = result[2].token;
        moverName1 = result[2].name;
        done();
      });
    });
  });


  it('Should send a message from user to company', (done) => {
    const messageObj = {
      company: company1,
      text: messageText1
    };
    request.post('/api/message/newMessageFromUser')
    .set('x-access-token', token1)
    .send(messageObj)
    .end( (err, res) => {
      expect(res.body.text).to.equal(messageText1);
      expect(res.body.user_id).to.equal(String(userId1));
      expect(res.body.company).to.equal(String(company1));
      done();
    });
  });


  it('Should send a message from the mover to the user', (done) => {
    const messageObj = {
      userId: userId1,
      text: messageText2
    };
    request.post('/api/message/newMessageFromMover')
    .set('x-access-token', moverToken1)
    .send(messageObj)
    .end( (err, res) => {
      expect(res.body.text).to.equal(messageText2);
      done();
    });
  });


  it('Should load all user conversations to a company', (done) => {
    request.get('/api/message/conversationForUser')
    .set('x-access-token', token1)
    .set('cookies', `company=${company1}`)
    .end( (err, res) => {
      const messages = res.body.messages;
      expect(messages.length).to.equal(2);
      //most recent at the head
      expect(messages[0].text).to.equal(messageText1);
      expect(messages[0].customerName).to.equal(customerName1);
      //messages sent from users to a company are not mapped to a movers name
      expect(messages[0].moverName).to.equal(undefined);
      expect(messages[1].text).to.equal(messageText2);
      expect(messages[1].customerName).to.equal(customerName1);
      expect(messages[1].moverName).to.equal(moverName1);
      done();
    });
  });


  it('Should load all company conversations for a mover', (done) => {
    request.get('/api/message/conversationForMover')
    .set('x-access-token', moverToken1)
    .set('cookies', `userId=${userId1}`)
    .end( (err, res) => {
      const messages = res.body.messages;
      expect(messages.length).to.equal(2);
      //most recent at the head
      expect(messages[0].text).to.equal(messageText1);
      expect(messages[1].text).to.equal(messageText2);
      done();
    });
  });

  it('Should not get messages for other users', (done) => {
    request.get('/api/message/conversationForUser')
    .set('x-access-token', token2)
    .set('cookies', `company=${company1}`)
    .end( (err, res) => {
      const messages = res.body.messages;
      expect(messages.length).to.equal(0);
      done();
    });
  });


});
