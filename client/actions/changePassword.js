import axios from 'axios';

import url from '../utils/url';

export const setPassword = (userId, body) => (dispatch) => {
  dispatch({
    type: 'SET_PASSWORD'
  });
  return axios.put(`${url}/users/setPassword/${userId}`, body)
    .then((response) => {
      if (response) {
        return dispatch({
          type: 'PASSWORD_SUCCESSFULLY_SET',
          payload: response.data
        });
      }
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'PASSWORD_SET_FAILED',
          payload: error.response.data
        });
      }
    });
};