const initialState = {
  isLoading: false,
  errors: {},
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SIGNING_UP': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGN_UP_SUCCESFULLY': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'SIGNUP_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};