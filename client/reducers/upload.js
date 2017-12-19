import types from '../types/types';

const {
  UPLOAD_COVER,
  UPLOAD_PDF,
  FAILED_TO_UPLOAD_COVER,
  FAILED_TO_UPLOAD_PDF,
  UPLOAD_COVER_SUCCESSFUL,
  UPLOAD_PDF_SUCCESSFUL
} = types;

const initialState = {
  isLoading: false,
  errors: {},
  uploaded: "",
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const uploadCover = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_COVER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPLOAD_COVER_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        uploaded: action.payLoad,
      };
    }
    case FAILED_TO_UPLOAD_COVER: {
      return {
        ...state,
        isLoading: false,
        errors: action.payLoad,
      };
    }
    default: return state;
  }
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const uploadPdf = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_PDF: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPLOAD_PDF_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        uploaded: action.payLoad,
      };
    }
    case FAILED_TO_UPLOAD_PDF: {
      return {
        ...state,
        isLoading: false,
        errors: action.payLoad,
      };
    }
    default: return state;
  }
};
