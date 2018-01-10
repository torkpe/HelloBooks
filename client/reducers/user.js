import types from '../types/types';

const {
  SET_CURRENT_USER,
  SIGN_UP_SUCCESFULLY,
  SIGNING_UP,
  SIGNUP_FAILED,
  CONFIRMING,
  CONFIRMATION_SUCCESSFUL,
  FAILED_TO_CONFIRM,
  CLEAR_USER_CONFIRMATION_STATE,
  SIGNING_IN,
  SIGNIN_SUCCESFUL,
  FAILED_TO_SIGNIN,
  FAILED_TO_SIGNUP,
  CLEAR_SIGNUP_STATE,
  CLEAR_SIGNIN_STATE,
  SEND_RESET_LINK,
  SEND_RESET_LINK_SUCCESSFUL,
  FAILED_TO_SEND_RESET_LINK,
  RESET_PASSWORD,
  FAILED_TO_RESET_PASSWORD,
  CLEAR_SEND_PASSWORD_RESET_LINK_STATE,
  CLEAR_RESET_PASSWORD_STATE,
  RESET_PASSWORD_SUCCESSFUL
} = types;

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
    case SIGNING_UP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGN_UP_SUCCESFULLY: {
      return {
        ...state,
        isLoading: false,
        successfullySignedup: action.payload,
      };
    }
    case FAILED_TO_SIGNUP: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_SIGNUP_STATE: {
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
    case CONFIRMING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CONFIRMATION_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        confirmationSuccessful: action.payload,
      };
    }
    case FAILED_TO_CONFIRM: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_USER_CONFIRMATION_STATE: {
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
    case SEND_RESET_LINK: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SEND_RESET_LINK_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        successfullySentLink: action.payload,
      };
    }
    case FAILED_TO_SEND_RESET_LINK: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case CLEAR_SEND_PASSWORD_RESET_LINK_STATE: {
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
    case RESET_PASSWORD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case RESET_PASSWORD_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        successfullyResetPassword: action.payload,
      };
    }
    case FAILED_TO_RESET_PASSWORD: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case CLEAR_RESET_PASSWORD_STATE: {
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
    case SIGNING_IN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGNIN_SUCCESFUL: {
      return {
        ...state,
        isLoading: false,
        successfullySignedin: action.payload,
      };
    }
    case FAILED_TO_SIGNIN: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case CLEAR_SIGNIN_STATE: {
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