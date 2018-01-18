import types from '../types/types';

const {
  UPDATE_USER,
  UPDATE_USER_SUCCESSFUL,
  FAILED_TO_UPDATE_USER,
  CLEAR_UPDATE_USER_STATE
} = types;

const updateUserState = {
  isLoading: false,
  errors: {},
  response: {},
};
/**
 * @description Update user function for state
 * 
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} state
 */
export default (state = updateUserState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    }
    case FAILED_TO_UPDATE_USER: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_UPDATE_USER_STATE: {
      return {
        isLoading: false,
        errors: {},
        response: {},
      };
    }
    default: return state;
  }
};