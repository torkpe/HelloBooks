const signupInitialState = {
  isLoading: false,
  errors: {},
  successfullySignedup: {},
};
export const userSignup = (state = signupInitialState, action = {}) => {
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
        successfullySignedup: action.payload,
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

const confirmationInitalState = {
  isLoading: false,
  errors: {},
  confirmationSuccessful: {},
};
export const confirmationRequest = (state = confirmationInitalState, action = {}) => {
  switch (action.type) {
    case 'CONFIRMING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CONFIRMATION_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        confirmationSuccessful: action.payload,
      };
    }
    case 'CONFIRMATION_FAILED ': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
const signinInitialState = {
  isLoading: false,
  successfullySignedin: {},
  errors: {},
};
export const userSignin = (state = signinInitialState, action = {}) => {
  switch (action.type) {
    case 'SIGNING_IN': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGNIN_SUCCESFUL': {
      return {
        ...state,
        isLoading: false,
        successfullySignedin: action.payload,
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