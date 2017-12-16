import axios from 'axios';

import url from '../utils/url';

/**
 * @param {number} userId
 * @return {void}
 */
const getUser = userId => (dispatch) => {
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
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'GET_USER_FAILED',
          payload: error.response.data
        });
      }
      return null;
    });
};
export default getUser;
