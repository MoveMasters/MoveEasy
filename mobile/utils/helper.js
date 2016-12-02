import axios from 'axios';
const url = 'https://movekick.herokuapp.com';
// const url = 'http://localhost:9000';
let moveId;
let token;

/** **********************INTERCEPTORS*************************** **/
axios.interceptors.request.use(
(config) => {
  if (moveId) {
    config.headers.cookies = `moveId=${moveId}`;
  }

  if (token) {
    config.headers['x-access-token'] = token;
    console.log('x-access-token being saved', token);
  }

  return config;
},
err => Promise.reject(err));


/** **********************ROUTEs*************************** **/
exports.postUser = (user, type) => {
  console.log('posting new user', user, type);
  return axios.post(`${url}/api/user/${type}`, user)
  .then((response) => {
    const lastMove = response.data.lastMove;
    if (lastMove) { moveId = lastMove._id; }
    token = response.data.token;

    return response;
  });
};

exports.newMove = (info) => {
  return axios({
    method: 'post',
    url: `${url}/api/move/newMove`,
    data: info,
  })
  .then((response) => {
    moveId = response.data._id;

    return response;
  });
};

exports.getExistingMove = () => {
  return axios.get(`${url}/api/move/existingMove`);
};

exports.updateExistingMove = (moveObj) => {
  return axios.post(`${url}/api/move/updateUserMoveInfo`, moveObj);
}

exports.getMoveItems = () => {
  return axios.get(`${url}/api/item/moveItems`);
};

exports.updateItem = (item) => {
  return axios.post(`${url}/api/item/updateItem`, { item });
};

exports.getConversation = () => {
  return axios.get(`${url}/api/message/conversationForUser`);
};

exports.postNewMessage = (text) => {
  return axios.post(`${url}/api/message/newMessageFromUser`, { text })
  .then(response => console.log('Message successfully posted!', response.data))
  .catch(error => console.log('Error posting message: ', error));
};

/** **********************CHAT HELPERS*************************** **/
exports.retrieveMessages = function(context) {
  exports.getConversation()
  .then((response) => {

    const messages = response.data.messages.map((message, i) => {
      return {
        _id: i,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: message.mover_id ? 2 : 1,
          name: message.mover_id ? message.company : 'Me Too',
          avatar: require('../assets/images/mkIcon.png'),
        },
        // additional custom parameters
      };
    });


    context.setState({ messages });
  })
  .catch(error => console.log('Error getting conversation: ', error));
};

