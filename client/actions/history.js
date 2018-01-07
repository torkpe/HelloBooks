import axios from 'axios';
import { browserHistory } from 'react-router';

import url from '../utils/url';
import types from '../types/types';

const {
  GET_ALL_BORROWED_BOOKS,
  GET_BORROWED_BOOKS_SUCCESSFUL,
  FAILED_TO_GET_BORROWED_BOOKS,
  GET_NOT_RETURNED_BOOKS,
  GET_NOT_RETURNED_SUCCESSFUL,
  FAILED_TO_GET_NOT_RETURNED_BOOKS,
} = types;
/**
 * @param {number} id
 * @return {void}
 */
export const getAllBorrowed = id => (dispatch) => {
  dispatch({ type: GET_ALL_BORROWED_BOOKS });
  return axios.get(`${url}/users/${id}/books/all-borrowed`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_BORROWED_BOOKS_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_BORROWED_BOOKS,
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
  dispatch({ type: GET_NOT_RETURNED_BOOKS });
  return axios.get(`${url}/users/${id}/books`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_NOT_RETURNED_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_NOT_RETURNED_BOOKS,
          payload: error.response.data
        });
      }
      return null;
    });
};