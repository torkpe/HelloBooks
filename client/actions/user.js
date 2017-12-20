import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

import setAuthToken from '../utils/setAuthToken';
import url from '../utils/url';
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

/**
 * @param {object} user
 * @return {void}
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});
/**
 * @param {object} userData
 * @return {void}
 */
export const userSignup = userData =>
  (dispatch) => {
    dispatch({ type: SIGNING_UP });
    return axios.post(`${url}/users/signup`, userData)
      .then((response) => {
        if (response) {
          dispatch({
            type: SIGN_UP_SUCCESFULLY,
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error) {
          dispatch({
            type: FAILED_TO_SIGNUP,
            payload: error.response.data,
          });
        }
      });
  };
/**
 * @param {object} userData
 * @return {void}
 */
export const userConfirmationRequest = userData =>
  (dispatch) => {
    dispatch({ type: CONFIRMING });
    axios.put(`${url}/confirmation/${userData.key}`, userData)
      .then((response) => {
        if (response) {
          dispatch({
            type: CONFIRMATION_SUCCESSFUL,
            payload: response.data,
          });
          const token = response.data.myToken;
          localStorage.setItem('jwt', token);
          setAuthToken(token);
          dispatch(setCurrentUser(jwt.decode(token)));
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: FAILED_TO_CONFIRM,
            payload: error.response.data
          });
        }
      });
  };
/**
 * @return {void}
 */
export const clearUserConfirmationState = () => dispatch => dispatch({
  type: CLEAR_USER_CONFIRMATION_STATE
});
/**
 * @param {object} data
 * @return {void}
 */
export const userSignin = data =>
  (dispatch) => {
    dispatch({ type: SIGNING_IN });
    return axios.post(`${url}/users/signin`, data)
      .then((response) => {
        if (response) {
          dispatch({
            type: SIGNIN_SUCCESFUL,
            payload: response.data,
          });
          const token = response.data.myToken;
          setAuthToken(token); // Set token for all requests
          dispatch(setCurrentUser(jwt.decode(token)));
        }
      }).catch((error) => {
        if (error) {
          dispatch({
            type: FAILED_TO_SIGNIN,
            payload: error.response.data,
          });
        }
      });
  };
/**
 * @param {object} data
 * @return {void}
 */
export const clearSignupState = () => dispatch => dispatch({
  type: CLEAR_SIGNUP_STATE
});
/**
 * @param {object} data
 * @return {void}
 */
export const clearSigninState = () => dispatch => dispatch({
  type: CLEAR_SIGNUP_STATE
});
/**
 * @param {object} data
 * @return {void}
 */
export const sendPasswordResetLink = data =>
  (dispatch) => {
    dispatch({ type: SEND_RESET_LINK });
    return axios.post(`${url}/users/send-password-reset-link`, data)
      .then((response) => {
        if (response) {
          dispatch({
            type: SEND_RESET_LINK_SUCCESSFUL,
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error) {
          dispatch({
            type: FAILED_TO_SEND_RESET_LINK,
            payload: error.response.data,
          });
        }
      });
  };
  /**
   * @param {string} key
   * @param {object} userData
   * @return {void}
   */
export const resetUserPassword = (key, userData) =>
  (dispatch) => {
    dispatch({ type: RESET_PASSWORD });
    return axios.put(`${url}/users/reset-password/${key}`, userData)
      .then((response) => {
        if (response) {
          dispatch({
            type: RESET_PASSWORD_SUCCESSFUL,
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error) {
          dispatch({
            type: FAILED_TO_RESET_PASSWORD,
            payload: error.response.data,
          });
        }
      });
  };
  /**
 * @return {void}
 */
export const clearSendPasswordResetLinkState = () => dispatch => dispatch({
  type: CLEAR_SEND_PASSWORD_RESET_LINK_STATE
});
  /**
 * @return {void}
 */
export const clearResetPasswordState = () => dispatch => dispatch({
  type: CLEAR_RESET_PASSWORD_STATE
});
  /**
 * @return {void}
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
