import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  UPDATE_USER,
  UPDATE_USER_SUCCESSFUL,
  FAILED_TO_UPDATE_USER,
  CLEAR_UPDATE_USER_STATE
} = types;
/**
 * @description Update user details
 * 
 * @param {umber} userId
 * @param {object} body
 * 
 * @return {object} Axios promise
 */
const updateUser = (userId, body) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
  });
  return axios.put(`${url}/users/update-user/${userId}`, body)
    .then((response) => {
      if (response) {
        return dispatch({
          type: UPDATE_USER_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_UPDATE_USER,
          payload: error.response.data,
        });
      }
      return null;
    });
};
/**
 * @description Clear update user stated
 * 
 * @return {undefined}
 */
const clearUpdateUserState = () => dispatch => dispatch({
  type: CLEAR_UPDATE_USER_STATE
});
export {
  updateUser, clearUpdateUserState
};
