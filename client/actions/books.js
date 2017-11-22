import axios from 'axios';

import url from '../utils/url';

// Get all books
export const getBooks = () => (dispatch) => {
  dispatch({ type: 'GET_BOOKS' });
  return axios.get(`${url}/books`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BOOKS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GETBOOKS',
          payload: error.response.data,
        });
      }
      return null;
    });
};
// Get all books exceeding deadline
export const exceedDeadlines = () => (dispatch) => {
  dispatch({ type: 'GET_EXCEEDS' });
  axios.get(`${url}/admins/exceed-deadlines`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_EXCEEDS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GET_EXCEEDS',
          payload: error.response.data,
        });
      }
      return null;
    });
};
// Get a book
export const getABook = id => (dispatch) => {
  dispatch({ type: 'GET_BOOK' });
  axios.get(`${url}/books/${id}`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GETBOOK',
          payload: error.response.data,
        });
      }
      return null;
    });
};
export const clearSingleBook = () => dispatch => dispatch({ type: 'CLEAR_SINGLE_BOOK' });
export const clearBooks = () => dispatch => dispatch({ type: 'CLEAR_BOOKS' });

// Get a book
export const checkIfBorrowed = (id, userId) => (dispatch) => {
  dispatch({ type: 'CHECK_IF_BORROWED' });
  return axios.get(`${url}/book/${id}/${userId}`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'CHECK_IF_BORROWED_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'CHECK_IF_BORROWED_FAILED',
          payload: error.response.data,
        });
      }
      return null;
    });
};
// get list of borrowed books
export const getBorrows = id => (dispatch) => {
  dispatch({ type: 'GET_BORROWS' });
  axios.get(`${url}/users/${id}/books`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BORROWS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_GET_BORROWS',
          payload: error.response.data,
        });
      }
      return null;
    });
};
// Borrow a book
export const borrowBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: 'BORROW_BOOK' });
  return axios.post(`${url}/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'BORROW_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_BORROW_BOOK',
          payload: error.response.data,
        });
      }
      return null;
    });
};
// Return a book
export const returnBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: 'RETURN_BOOK' });
  return axios.put(`${url}/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'RETURN_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'FAILED_TO_RETURN_BOOK',
          payload: error.response.data,
        });
      }
      return null;
    });
};

// Post a book
export const postBook = data => (dispatch) => {
  dispatch({ type: 'POST_BOOK' });
  return axios.post(`${url}/books`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'POST_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'POST_BOOK_FAILED',
          payload: error.response.data,
        });
      }
      return null;
    });
};

// Delete a book
export const deleteBook = data => (dispatch) => {
  dispatch({ type: 'DELETE_BOOK' });
  return axios.put(`${url}/books/${data}/delete`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'DELETE_BOOK_SUCCESSFUL',
          poayLoad: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        if (error) {
          return dispatch({
            type: 'DELETE_BOOK_FAILED',
            poayLoad: error.response.data,
          });
        }
      }
      return null;
    });
};
// Edit a book
export const editBook = (data, bookId) => (dispatch) => {
  dispatch({ type: 'EDIT_BOOK' });
  return axios.put(`${url}/books/${bookId}`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'EDIT_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    })
    .catch((error) => {
      if (error) {
        return dispatch({
          type: 'EDIT_BOOK_FAILED',
          payload: error.response.data,
        });
      }
      return null;
    });
};
