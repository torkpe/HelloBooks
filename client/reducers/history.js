import types from '../types/types';

const {
  GET_ALL_BORROWED_BOOKS,
  GET_BORROWED_BOOKS_SUCCESSFUL,
  FAILED_TO_GET_BORROWED_BOOKS,
  GET_NOT_RETURNED_BOOKS,
  GET_NOT_RETURNED_SUCCESSFUL,
  FAILED_TO_GET_NOT_RETURNED_BOOKS,
  CLEAR_BOOKS_STATE
} = types;

const initialState = {
  isLoading: false,
  errors: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const getAllBorrowed = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALL_BORROWED_BOOKS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_BORROWED_BOOKS_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        borrowedBooks: action.payload,
      };
    }
    case FAILED_TO_GET_BORROWED_BOOKS: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_BOOKS_STATE: {
      return {
        ...state,
        isLoading: false,
        borrowedBooks: [],
      };
    }
    default: return state;
  }
};
const notReturnedState = {
  isLoading: false,
  notReturned: [],
  errors: {},
};
export const allNotReturned = (state = notReturnedState, action = {}) => {
  switch (action.type) {
    case GET_NOT_RETURNED_BOOKS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_NOT_RETURNED_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        notReturned: action.payload,
      };
    }
    case FAILED_TO_GET_NOT_RETURNED_BOOKS: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_BOOKS_STATE: {
      return {
        ...state,
        isLoading: false,
        notReturned: [],
      };
    }
    default: return state;
  }
};
