import axios from 'axios';
import { browserHistory } from 'react-router';

import url from '../utils/url';

/**
 * @param {sting} value
 * @return {void}
 */
export const getHistory = value => (dispatch) => {
  if (value === 'all') {
    dispatch({ type: 'SWITCH_TO_ALL_BORROWED' });
    return browserHistory.push('/all_borrowed_books');
  } else if (value === 'notReturned') {
    dispatch({ type: 'SWITCH_TO_ALL_NOT_RETURNED' });
    return browserHistory.push('/not_yet_returned');
  }
  return null;
};

/**
 * @param {number} id
 * @return {void}
 */
export const getAllBorrowed = id => (dispatch) => {
  dispatch({ type: 'GET_ALL_BORROWED_BOOKS' });
  axios.get(`${url}/users/${id}/books/all-borrowed`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BORROWED_BOOKS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GET_BORROWED_BOOKS',
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * @param {number} id
 * @return {void}
 */
export const allNotReturned = id => (dispatch) => {
  dispatch({ type: 'GET_NOT_RETURNED_BOOKS' });
  axios.get(`${url}/users/${id}/books`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_NOT_RETURNED_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GET_NOT_RETURNED_BOOKS',
          payload: error.response.data
        });
      }
      return null;
    });
};