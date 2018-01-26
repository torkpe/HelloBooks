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
  FAILED_TO_GET_BOOK,
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
  CHECK_IF_BORROWED,
  ADD_GENRE,
  ADD_GENRE_SUCCESSFUL,
  FAILED_TO_ADD_GENRE,
  GET_GENRE,
  GET_GENRE_SUCCESSFUL,
  FAILED_TO_GET_GENRE,
  CLEAR_ADD_GENRE_STATE
} = types;
/**
 * @description Get all books
 * 
 * @param {void}
 * 
 * @return {object} Axios promise
 */
export const getBooks = () => (dispatch) => {
  dispatch({ type: GET_BOOKS });
  return axios.get(`${url}/books`)
    .then((response) => {
      if (response) {
        if (response.data) {
          return dispatch({
            type: GET_BOOKS_SUCCESSFUL,
            payload: response.data,
          });
        }
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
 * @description Clear borrowed books state
 * 
 * @param {void}
 * 
 * @return {object} Dispatch
 */
export const clearBorrowBookState = () => dispatch =>
  dispatch({
    type: CLEAR_BORROW_BOOK_STATE
  });

/**
 * @description Get a book
 * 
 * @param {number} id
 * 
 * @return {object} Axios promise
 */
export const getABook = id => (dispatch) => {
  dispatch({ type: GET_BOOK });
  return axios.get(`${url}/books/${id}`)
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
        if(error.response){
          return dispatch({
            type: FAILED_TO_GET_BOOK,
            payload: error.response.data,
          });
        }
      }
      return null;
    });
};
/**
 * @description Clear single book state
 * 
 * @return {object} Dispatch
 */
export const clearSingleBookState = () => dispatch => dispatch({
  type: CLEAR_SINGLE_BOOK_STATE
});
/**
 * @description Clear created books state
 * 
 * @return {object} Dispatch
 */
export const clearCreatedBookState = () => dispatch => dispatch({
  type: CLEAR_CREATED_BOOK_STATE
});
/**
 * @description Clear all books state
 * 
 * @return {object} Dispatch
 */
export const clearBooksState = () => dispatch => dispatch({
  type: CLEAR_BOOKS_STATE
});
/**
 * @description Clear all add genre state
 * 
 * @return {object} Dispatch
 */
export const clearAddGenreState = () => dispatch => dispatch({
  type: CLEAR_ADD_GENRE_STATE
});
/**
 * @description Clear deleted book state
 * 
 * @return {object} Dispatch
 */
export const clearDeleteBookState = () => dispatch => dispatch({
  type: CLEAR_DELETE_BOOK_STATE
});
/**
 * @description Get a book
 * 
 * @param {number} id
 * 
 * @param {number} userId
 * 
 * @return {object} Axios promise
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
 * @description Get list of borrowed books action
 * 
 * @param {number} id
 * 
 * @return {object} Axios promise
 */
export const getBorrows = id => (dispatch) => {
  dispatch({ type: GET_BORROWS });
  return axios.get(`${url}/users/${id}/books`)
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
 * @description Borrow a book action
 * 
 * @param {number} id
 * 
 * @param {number} bookId
 * @param {object} data
 * 
 * @return {object} Axios promise
 */
export const borrowBook = (id, bookId) => (dispatch) => {
  dispatch({ type: BORROW_BOOK });
  return axios.post(`${url}/users/${id}/${bookId}/books`)
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
 * @description Add book genre action
 * 
 * @param {object} genre
 * 
 * @return {object} Axios promise
 */
export const addBookGenre = (genre) => (dispatch) => {
  dispatch({ type: ADD_GENRE })
  return axios.post(`${url}/books/genre`, genre)
    .then((response) => {
      if (response) {
        return dispatch({
          type: ADD_GENRE_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_ADD_GENRE,
          payload: error.response.data,
        });
      }
      return null;
    });
}
/**
 * @description Get all genre action
 * 
 * @param {object} genre
 * 
 * @return {object} Axios promise
 */
export const getAllGenre = (genre) => (dispatch) => {
  dispatch({ type: GET_GENRE })
  return axios.get(`${url}/books/genre`, genre)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_GENRE_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_GENRE,
          payload: error.response.data,
        });
      }
      return null;
    });
}
/**
 * @description Return a book action
 *
 * @param {number} bookId
 * @param {object} data
 * 
 * @return {object} Axios promise
 */
export const returnBook = (id, bookId) => (dispatch) => {
  dispatch({ type: RETURN_BOOK });
  return axios.put(`${url}/users/${id}/${bookId}/books`)
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
 * @description Post a book
 * 
 * @param {object} data
 * 
 * @return {object} Axios promise 
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
 * @description Delete a book action
 * 
 * @param {object} data
 * 
 * @return {object} Axios promise
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
 * @description Edit a book
 * 
 * @param {object} data
 * 
 * @param {number} bookId
 * 
 * @return {object} Axios promise
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
