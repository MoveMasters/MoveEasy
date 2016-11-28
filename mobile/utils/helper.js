import axios from 'axios';
// const url = 'http://10.6.27.17:9000';
// const url = 'http://localhost:9000';
// const url = 'http://192.168.0.105:9000';
// const url = 'http://10.6.27.137:9000';
// const url = 'http://10.6.26.231:9000';
const url = 'https://iiiiii.herokuapp.com';
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

exports.getMoveItems = () => {
  return axios.get(`${url}/api/item/moveItems`);
};

exports.updateItem = (item) => {
  return axios.post(`${url}/api/item/updateItem`, { item });
};
