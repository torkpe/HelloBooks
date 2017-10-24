const payBackState = {
  isLoading: false,
  errors: {},
  response: {},
  successfullyPaid: false,
};
export default (state = payBackState, action = {}) => {
  switch (action.type) {
    case 'PAY_BACK': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PAY_BACK_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
        successfullyPaid: true,
      };
    }
    case 'PAY_BACK_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};