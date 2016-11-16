import axios from 'axios';
// const url = 'http://10.6.27.17:9000';
const url = 'http://localhost:9000';

exports.postUser = (user, type) => {
  if (type === 'signin') {
    return axios.post(`${url}/api/user/signin`, user);
  } else if (type === 'signup') {
    return axios.post(`${url}/api/user/signup`, user);
  }
};

exports.newMove = (info, token) => {
  return axios({
    method: 'post',
    url: `${url}/api/move/newMove`,
    data: info,
    headers: {
      'x-access-token': token,
    },
  });
};
