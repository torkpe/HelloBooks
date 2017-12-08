import axios from 'axios';

import url from '../utils/url';

const updateUser = (userId, body) => (dispatch) => {
  dispatch({
    type: 'UPDATE_USER',
  });
  return axios.put(`${url}/users/update-user/${userId}`, body)
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
const clearUpdateUserState = () => dispatch => dispatch({
  type: 'CLEAR_UPDATE_USER_STATE'
});
export {
  updateUser, clearUpdateUserState
};
