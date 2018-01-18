import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  GET_USER,
  GET_USER_SUCCESSFUL,
  FAILED_TO_GET_USER
} = types;
/**
 * @description Get user
 * 
 * @param {number} userId
 * 
 * @return {object} Axios promise
 */
const getUser = userId => (dispatch) => {
  dispatch({
    type: GET_USER,
  });
  return axios.get(`${url}/users/${userId}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_USER_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_USER,
          payload: error.response.data
        });
      }
      return null;
    });
};
export default getUser;
