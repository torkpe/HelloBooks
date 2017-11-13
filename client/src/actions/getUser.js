import axios from 'axios';

import url from '../utils/url';

const getUser = userId => (dispatch) => {
  console.log(userId)
  dispatch({
    type: 'GET_USER',
  });
  return axios.get(`${url}/users/${userId}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: 'GET_USER_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'GET_USER_FAILED',
          payload: err,
        });
      }
      return null;
    });
};
export default getUser;
