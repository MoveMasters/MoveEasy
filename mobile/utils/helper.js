import axios from 'axios';
const url = 'http://10.6.27.17:9000';
// const url = 'http://localhost:9000';

exports.postUser = (user, type) => {
  if (type === 'signin') {
    return axios.post(`${url}/api/user/signin`, user);
  } else if (type === 'signup') {
    return axios.post(`${url}/api/user/signup`, user);
  }
};

exports.postInfo = info => axios.post(`${url}/api/user/info`, info);
