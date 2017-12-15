const signupInitialState = {
  isLoading: false,
  errors: {},
  successfullySignedup: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
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
    case 'CLEAR_SIGNUP_STATE': {
      return {
        ...state,
        isLoading: false,
        errors: {},
        successfullySignedup: {},
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
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const userConfirmationRequest = (state = confirmationInitalState, action = {}) => {
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
    case 'CONFIRMATION_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_CLEAR_USER_CONFIRMATION_STATE': {
      return {
        isLoading: false,
        errors: {},
        confirmationSuccessful: {},
      };
    }
    default: return state;
  }
};
const resetPasswordInitialState = {
  isLoading: false,
  error: {},
  successfullySentLink: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const sendPasswordResetLink = (state = resetPasswordInitialState, action = {}) => {
  switch (action.type) {
    case 'SEND_RESET_LINK': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SEND_RESET_LINK_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        successfullySentLink: action.payload,
      };
    }
    case 'SEND_RESET_LINK_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'CLEAR_SEND_PASSWORD_RESET_LINK_STATE': {
      return {
        isLoading: false,
        errors: {},
        successfullySentLink: {},
      };
    }
    default: return state;
  }
};
const resetUserPassword = {
  isLoading: false,
  error: {},
  successfullyResetPassword: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const resetPassword = (state = resetUserPassword, action = {}) => {
  switch (action.type) {
    case 'RESET_PASSWORD': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'RESET_PASSWORD_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        successfullyResetPassword: action.payload,
      };
    }
    case 'RESET_PASSWORD_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'CLEAR_RESET_PASSWORD_STATE': {
      return {
        isLoading: false,
        errors: {},
        successfullyResetPassword: {},
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
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
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
    case 'CLEAR_SIGNIN_STATE': {
      return {
        ...state,
        isLoading: false,
        errors: {},
        successfullySignedin: {},
      };
    }
    default: return state;
  }
};