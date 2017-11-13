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
          if (error) {
            dispatch({
              type: 'SIGNUP_FAILED',
              payload: error.response.data,
            });
          }
        }
      });
  };

export const userConfirmRequest = userData =>
  dispatch =>
    axios.put(`${url}/confimation/${userData.key}`, userData)
      .then((response) => {
        const token = response.data.myToken;
        localStorage.setItem('jwt', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
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
      }).catch((err) => {
        dispatch({
          type: 'SIGNIN_FAILED',
          payload: err,
        });
      });
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
