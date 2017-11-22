import axios from 'axios';

import url from '../utils/url';

const updateUser = (userId, body) => (dispatch) => {
  dispatch({
    type: 'UPDATE_USER',
  });
  return axios.put(`${url}/users/updateUser/${userId}`, body)
    .then((response) => {
      if (response) {
        return dispatch({
          type: 'UPDATE_USER_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'UPDATE_USER_FAILED',
          payload: error.response.data,
        });
      }
      return null;
    });
};
export default updateUser;
