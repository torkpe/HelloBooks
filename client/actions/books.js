import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  GET_BOOKS,
  GET_BOOKS_SUCCESSFUL,
  FAILED_TO_GET_BOOKS,
  CLEAR_BOOKS_STATE_STATE,
  CLEAR_BORROW_BOOK_STATE,
  GET_BOOK,
  GET_BOOK_SUCCESSFUL,
  FAILED_TO_GETBOOK,
  CLEAR_SINGLE_BOOK_STATE,
  CLEAR_CREATED_BOOK_STATE,
  CLEAR_BOOKS_STATE,
  CLEAR_DELETE_BOOK_STATE,
  CHECK_IF_BORROWED_SUCCESSFUL,
  FAILED_TO_CHECK_IF_BORROWED,
  GET_BORROWS,
  GET_BORROWS_SUCCESSFUL,
  FAILED_TO_GET_BORROWS,
  BORROW_BOOK,
  BORROW_BOOK_SUCCESSFUL,
  FAILED_TO_BORROW_BOOK,
  RETURN_BOOK,
  RETURN_BOOK_SUCCESSFUL,
  FAILED_TO_RETURN_BOOK,
  POST_BOOK,
  POST_BOOK_SUCCESSFUL,
  FAILED_TO_POST_BOOK,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESSFUL,
  FAILED_TO_DELETE_BOOK,
  EDIT_BOOK,
  EDIT_BOOK_SUCCESSFUL,
  FAILED_TO_EDIT_BOOK,
  CHECK_IF_BORROWED
} = types;
/**
 * Get all books
 * @return {void}
 */
export const getBooks = () => (dispatch) => {
  dispatch({ type: GET_BOOKS });
  return axios.get(`${url}/books`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_BOOKS_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_BOOKS,
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * clear borrowed books state
 * @return {void}
 */
export const clearBorrowBookState = () => dispatch =>
  dispatch({
    type: CLEAR_BORROW_BOOK_STATE
  });

/**
 * Get a book
 * @param {number} id
 * @return {void}
 */
export const getABook = id => (dispatch) => {
  dispatch({ type: GET_BOOK });
  axios.get(`${url}/books/${id}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_BOOK_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GETBOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};
/**
 * clear single book state
 * @return {void}
 */
export const clearSingleBookState = () => dispatch => dispatch({
  type: CLEAR_SINGLE_BOOK_STATE
});
/**
 * clear created books state
 * @return {void}
 */
export const clearCreatedBookState = () => dispatch => dispatch({
  type: CLEAR_CREATED_BOOK_STATE
});
/**
 * clear all books state
 * @return {void}
 */
export const clearBooksState = () => dispatch => dispatch({
  type: CLEAR_BOOKS_STATE
});
/**
 * clear deleted book state
 * @return {void}
 */
export const clearDeleteBookState = () => dispatch => dispatch({
  type: CLEAR_DELETE_BOOK_STATE
});
/**
 * Get a book
 * @param {number} id
 * @param {number} userId
 * @return {void}
 */
export const checkIfBorrowed = (id, userId) => (dispatch) => {
  dispatch({ type: CHECK_IF_BORROWED });
  return axios.get(`${url}/book/${id}/${userId}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: CHECK_IF_BORROWED_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_CHECK_IF_BORROWED,
          payload: error.response.data,
        });
      }
      return null;
    });
};
/**
 * get list of borrowed books
 * @param {number} id
 * @return {void}
 */
export const getBorrows = id => (dispatch) => {
  dispatch({ type: GET_BORROWS });
  axios.get(`${url}/users/${id}/books`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_BORROWS_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_BORROWS,
          payload: error.response.data,
        });
      }
      return null;
    });
};
/**
 * Borrow a book
 * @param {number} id
 * @param {number} bookId
 * @param {object} data
 * @return {void}
 */
export const borrowBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: BORROW_BOOK });
  return axios.post(`${url}/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response) {
        return dispatch({
          type: BORROW_BOOK_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_BORROW_BOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * Return a book
 * @param {number} id
 * @param {number} bookId
 * @param {object} data
 * @return {void}
 */
export const returnBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: RETURN_BOOK });
  return axios.put(`${url}/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response) {
        return dispatch({
          type: RETURN_BOOK_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_RETURN_BOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * Post a book
 * @param {object} data
 * @return {void}
 */
export const postBook = data => (dispatch) => {
  dispatch({ type: POST_BOOK });
  return axios.post(`${url}/books`, data)
    .then((response) => {
      if (response) {
        return dispatch({
          type: POST_BOOK_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_POST_BOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * Delete a book
 * @param {object} data
 * @return {void}
 */
export const deleteBook = data => (dispatch) => {
  dispatch({ type: DELETE_BOOK });
  return axios.put(`${url}/books/${data}/delete`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: DELETE_BOOK_SUCCESSFUL,
          payLoad: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_DELETE_BOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};

/**
 * Edit a book
 * @param {object} data
 * @param {number} bookId
 * @return {void}
 */
export const editBook = (data, bookId) => (dispatch) => {
  dispatch({ type: EDIT_BOOK });
  return axios.put(`${url}/books/${bookId}`, data)
    .then((response) => {
      if (response) {
        return dispatch({
          type: EDIT_BOOK_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    })
    .catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_EDIT_BOOK,
          payload: error.response.data,
        });
      }
      return null;
    });
};
