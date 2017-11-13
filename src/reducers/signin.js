const initialState = {
  isLoading: false,
  user: {},
  errors: {},
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SIGNING_IN': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGN_IN_SUCCESFULLY': {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    case 'SIGNIN_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};