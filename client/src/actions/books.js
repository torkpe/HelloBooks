import axios from 'axios';
require('dotenv').config();

// Get all books
export const getBooks = () => (dispatch) => {
  dispatch({ type: 'GET_BOOKS' });
  return axios.get('https://hellobooks-project.herokuapp.com/api/books')
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BOOKS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GETBOOKS',
          payload: err,
        });
      }
      return null;
    });
};
// Get all books exceeding deadline
export const exceedDeadlines = () => (dispatch) => {
  dispatch({ type: 'GET_EXCEEDS' });
  axios.get('https://hellobooks-project.herokuapp.com/api/admins/exceed-deadlines')
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BOOKS_EXCEEDS',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GET_EXCEEDS',
          payload: err,
        });
      }
      return null;
    });
};
// Get a book
export const getABook = id => (dispatch) => {
  dispatch({ type: 'GET_BOOK' });
  axios.get(`https://hellobooks-project.herokuapp.com/api/books/${id}`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GETBOOK',
          payload: err,
        });
      }
      return null;
    });
};
// Get a book
export const checkIfBorrowed = (id, userId) => (dispatch) => {
  dispatch({ type: 'CHECK_IF_BORROWED' });
  return axios.get(`https://hellobooks-project.herokuapp.com/api/book/${id}/${userId}`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'CHECK_IF_BORROWED_SUCCESSFUL',
          payload: response,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'CHECK_IF_BORROWED_FAILED',
          payload: err,
        });
      }
      return null;
    });
};
// get list of borrowed books
export const getBorrows = id => (dispatch) => {
  dispatch({ type: 'GET_BORROWS' });
  axios.get(`https://hellobooks-project.herokuapp.com/api/users/${id}/books`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'GET_BORROWS_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_GET_BORROWS',
          payload: err,
        });
      }
      return null;
    });
};
// Borrow a book
export const borrowBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: 'BORROW_BOOK' });
  return axios.post(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'BORROW_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_BORROW_BOOK',
          payload: err,
        });
      }
      return null;
    });
};
// Return a book
export const returnBook = (id, bookId, data) => (dispatch) => {
  dispatch({ type: 'RETURN_BOOK' });
  axios.put(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'RETURN_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_RETURN_BOOK',
          payload: err.response.data,
        });
      }
      return null;
    });
};

// Post a book
export const postBook = data => (dispatch) => {
  dispatch({ type: 'POST_BOOK' });
  return axios.post('https://hellobooks-project.herokuapp.com/api/books', data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'POST_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        if (err.data) {
          return dispatch({
            type: 'POST_BOOK_FAILED',
            payload: err.response.data,
          });
        }
      }
      return null;
    });
};

// Delete a book
export const deleteBook = data => (dispatch) => {
  dispatch({ type: 'DELETE_BOOK' });
  return axios.put(`https://hellobooks-project.herokuapp.com/api/books/${data}/delete`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'DELETE_BOOK_SUCCESSFUL',
          poayLoad: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        if (err.data) {
          return dispatch({
            type: 'DELETE_BOOK_FAILED',
            poayLoad: err.data,
          });
        }
      }
      return null;
    });
};
// Edit a book
export const editBook = (data, bookId) => (dispatch) => {
  dispatch({ type: 'EDIT_BOOK' });
  return axios.put(`https://hellobooks-project.herokuapp.com/api/books/${bookId}`, data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'EDIT_BOOK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    })
    .catch((err) => {
      if (err.data) {
        return dispatch({
          type: 'EDIT_BOOK_FAILED',
          payload: err,
        });
      }
      return null;
    });
};
