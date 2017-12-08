import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

import setAuthToken from '../utils/setAuthToken';
import url from '../utils/url';

export const setCurrentUser = user => ({
  type: "SET_CURRENT_USER",
  user,
});
export const userSignup = userData =>
  (dispatch) => {
    dispatch({ type: 'SIGNING_UP' });
    return axios.post(`${url}/users/signup`, userData)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'SIGN_UP_SUCCESFULLY',
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error) {
          dispatch({
            type: 'SIGNUP_FAILED',
            payload: error.response.data,
          });
        }
      });
  };

export const userConfirmationRequest = userData =>
  (dispatch) => {
    dispatch({ type: 'CONFIRMING' });
    axios.put(`${url}/confirmation/${userData.key}`, userData)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'CONFIRMATION_SUCCESSFUL',
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
            type: 'CONFIRMATION_FAILED',
            payload: error.response.data
          });
        }
      });
  };
export const clearUserConfirmationState = () => dispatch => dispatch({
  type: 'CLEAR_CLEAR_USER_CONFIRMATION_STATE'
})

export const userSignin = data =>
  (dispatch) => {
    dispatch({ type: 'SIGNING_IN' });
    return axios.post(`${url}/users/signin`, data)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'SIGNIN_SUCCESFUL',
            payload: response.data,
          });
          const token = response.data.myToken;
          setAuthToken(token); // Set token for all requests
          dispatch(setCurrentUser(jwt.decode(token)));
        }
      }).catch((error) => {
        dispatch({
          type: 'SIGNIN_FAILED',
          payload: error.response.data,
        });
      });
  };
export const clearSignupState = () => dispatch => dispatch({
  type: 'CLEAR_SIGNUP_STATE'
})
export const clearSigninState = () => dispatch => dispatch({
  type: 'CLEAR_SIGNIN_STATE'
})

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
