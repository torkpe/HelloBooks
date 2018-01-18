import types from '../types/types';

const {
  GET_USER,
  GET_USER_SUCCESSFUL,
  FAILED_TO_GET_USER
} = types;

const getUserState = {
  fetching: false,
  user: {},
  errors: '',
};
/**
 * @description Get user function for state
 * 
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} state
 */
const getUser = (state = getUserState, action = {}) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        fetching: true,
      };
    }
    case GET_USER_SUCCESSFUL: {
      return {
        ...state,
        fetching: false,
        user: action.payload,
      };
    }
    case FAILED_TO_GET_USER: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
export default getUser;
