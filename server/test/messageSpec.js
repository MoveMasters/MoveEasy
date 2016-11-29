const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('./../server');
const messageController = require('./../db/messages/messageController');
const testUtil = require('./testUtil');
const dbUtil = require('./../db/dbUtil');

const request = supertest.agent(server);


let userId1, userId2, userId3, token1, token2, token3;
const messageText1 = 'This is a message';
const messageText2 = 'Hello world';



describe('Message Server API tests', () => {


  before( function(done) {
    this.timeout(3000);
    testUtil.clearAndSignupUsers123(request)
    .then( result => {
      token1 = result[0].token;
      token2 = result[1].token;
      token3 = result[2].token;
      userId1 = result[0]._id;
      userId2 = result[1]._id;
      userId3 = result[2]._id;
      done();
    });
  });


  it('Should send a message between users', (done) => {
    const messageObj = {
      sourceId: userId1,
      destinationId: userId2,
      text: messageText1
    };
    request.post('/api/message/newMessage')
    .set('x-access-token', token1)
    .send(messageObj)
    .end( (err, res) => {
      expect(res.body.text).to.equal(messageText1);
      expect(res.body.source_id).to.equal(String(userId1));
      expect(res.body.destination_id).to.equal(String(userId2));
      done();
    });
  });


  it('Should send a second between users', (done) => {
    const messageObj = {
      sourceId: userId2,
      destinationId: userId1,
      text: messageText2
    };
    request.post('/api/message/newMessage')
    .set('x-access-token', token2)
    .send(messageObj)
    .end( (err, res) => {
      expect(res.body.text).to.equal(messageText2);
      expect(res.body.source_id).to.equal(String(userId2));
      expect(res.body.destination_id).to.equal(String(userId1));
      done();
    });
  });


  it('Should load all messages between users', (done) => {
    request.get('/api/message/conversation')
    .set('x-access-token', token1)
    .send({destinationId: userId2})
    .end( (err, res) => {
      const messages = res.body.messages;
      expect(messages.length).to.equal(2);
      expect(messages[0].text).to.equal(messageText1);
      expect(messages[1].text).to.equal(messageText2);
      done();
    });
  });

  it('Should not get messages for other users', (done) => {
    request.get('/api/message/conversation')
    .set('x-access-token', token3)
    .send({destinationId: userId2})
    .end( (err, res) => {
      const messages = res.body.messages;
      expect(messages.length).to.equal(0);
      done();
    });
  });

});
