const setPasswordState = {
  isLoading: false,
  errors: {},
  response: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export default (state = setPasswordState, action = {}) => {
  switch (action.type) {
    case 'SET_PASSWORD': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PASSWORD_SUCCESSFULLY_SET': {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    }
    case 'PASSWORD_SET_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_SET_PASSWORD_STATE': {
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