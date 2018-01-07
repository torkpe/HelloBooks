import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESSFUL,
  FAILED_TO_GET_NOTIFICATION
} = types;

/**
 * @param {string} category
 * @param {number} id
 * @return {void}
 */
export const getNotification = (category, id) => {
  const determineCategory = () => {
    if (category === 'admin') {
      return axios.get(`${url}/notifications/admin`);
    }
    return axios.get(`${url}/notifications/user/${id}`);
  };
  return (dispatch) => {
    dispatch({ type: GET_NOTIFICATION });
    return determineCategory(category)
      .then((response) => {
        if (response.data) {
          return dispatch({
            type: GET_NOTIFICATION_SUCCESSFUL,
            payload: response.data,
          });
        }
        return null;
      }).catch((error) => {
        if (error) {
          return dispatch({
            type: FAILED_TO_GET_NOTIFICATION,
            payload: error.response.data,
          });
        }
        return null;
      });
  };
};