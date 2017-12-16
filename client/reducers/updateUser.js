const updateUserState = {
  isLoading: false,
  errors: {},
  response: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export default (state = updateUserState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_USER_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    }
    case 'UPDATE_USER_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_UPDATE_USER_STATE': {
      return {
        isLoading: false,
        errors: {},
        response: {},
      };
    }
    default: return state;
  }
};