import types from '../types/types';

const {
  SET_PASSWORD,
  PASSWORD_SUCCESSFULLY_SET,
  FAILED_TO_SET_PASSWORD,
  CLEAR_SET_PASSWORD_STATE
} = types;

const changePasswordState = {
  isLoading: false,
  errors: {},
  response: {},
};
/**
 * @description Change password function for state
 * 
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} state
 */
export default (state = changePasswordState, action = {}) => {
  switch (action.type) {
    case SET_PASSWORD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PASSWORD_SUCCESSFULLY_SET: {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    }
    case FAILED_TO_SET_PASSWORD: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_SET_PASSWORD_STATE: {
      return {
        ...state,
        isLoading: false,
        errors: {},
        response: {},
      };
    }
    default: return state;
  }
};