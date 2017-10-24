const chargeUserState = {
  isLoading: false,
  errors: {},
  response: {},
  successfullyCharged: false,
};
export default (state = chargeUserState, action = {}) => {
  switch (action.type) {
    case 'CHARGE_USER': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SUCCESSFULLY_CHARGED_USER': {
      return {
        ...state,
        isLoading: false,
        response: action.payload,
        successfullyCharged: true,
      };
    }
    case 'CHARGE_USER_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};