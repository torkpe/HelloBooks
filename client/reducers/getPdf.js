import types from '../types/types';

const {
  GET_PDF,
  GET_PDF_SUCCESSFUL,
  FAILED_TO_GET_PDF
} = types;

const getPdfState = {
  fetching: false,
  books: {},
  errors: '',
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
const getPdf = (state = getPdfState, action = {}) => {
  switch (action.type) {
    case GET_PDF: {
      return {
        ...state,
        fetching: true,
      };
    }
    case GET_PDF_SUCCESSFUL: {
      return {
        ...state,
        fetching: false,
        books: action.payload,
      };
    }
    case FAILED_TO_GET_PDF: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
export default getPdf;
