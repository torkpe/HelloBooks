import axios from 'axios';
import { browserHistory } from 'react-router';

import url from '../utils/url';

export const getHistory = val => (dispatch) => {
  if (val === 'all') {
    dispatch({ type: 'SWITCH_TO_ALL_BORROWED' });
    return browserHistory.push('/all_borrowed_books');
  } else if (val === 'notReturned') {
    dispatch({ type: 'SWITCH_TO_ALL_NOT_RETURNED' });
    return browserHistory.push('/not_yet_returned');
  }
  return null;
};
export const getBorrowHistory = (star, id) => (dispatch) => {
  dispatch({ type: 'GET_HISTORY_OF_BORROWS' });
  axios.get(`${url}/users/${id}/star/all-borrowed`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_HISTORY_OF_BORROW_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GET_HISTORY_OF_BORROWS',
          payload: err.response.data,
        });
      }
      return null;
    });
};

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
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GET_BORROWED_BOOKS',
          payload: err.response.data,
        });
      }
      return null;
    });
};

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
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GET_NOT_RETURNED_BOOKS',
          payload: err,
        });
      }
      return null;
    });
};