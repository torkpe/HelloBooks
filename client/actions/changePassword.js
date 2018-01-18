import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  SET_PASSWORD,
  PASSWORD_SUCCESSFULLY_SET,
  FAILED_TO_SET_PASSWORD,
  CLEAR_SET_PASSWORD_STATE
} = types;
/**
 * @description Change user password
 * 
 * @param {number} userId
 * @param {object} body
 * 
 * @return {object} Axios response
 */
export const changePassword = (userId, body) => (dispatch) => {
  dispatch({
    type: SET_PASSWORD
  });
  return axios.put(`${url}/users/change-password/${userId}`, body)
    .then((response) => {
      if (response) {
        return dispatch({
          type: PASSWORD_SUCCESSFULLY_SET,
          payload: response.data
        });
      }
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_SET_PASSWORD,
          payload: error.response.data
        });
      }
    });
};
/**
 * @description Clear set password state
 * 
 * @param {void}
 * 
 * @return {object} Dispatch
 */
export const clearSetPasswordState = () => dispatch => dispatch({
  type: CLEAR_SET_PASSWORD_STATE
});
