import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import setAuthToken from '../utils/setAuthToken';


export const setCurrentUser = user => ({
  type: "SET_CURRENT_USER",
  user,
});
export const userSignupRequest = (userData) => {
  const determine = (user) => {
    if (user === 'user') {
      return axios.post('https://hellobooks-project.herokuapp.com/api/users/signup', userData);
    }
    return axios.post('https://hellobooks-project.herokuapp.com/api/admin/signup', userData);
  };
  return (dispatch) => {
    dispatch({ type: 'SIGNING_UP' });
    determine(userData.signupType)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'SIGN_UP_SUCCESFULLY',
          });
          if (userData.signupType === 'user') {
            browserHistory.push('/redirect');
          } else {
            const token = response.data.myToken;
            localStorage.setItem('jwt', token);
            setAuthToken(token); // Set token for all requests
            dispatch(setCurrentUser(jwt.decode(token)));
            browserHistory.push('/admin_home');                
          }
        }
      }).catch((err) => {
        if (err) {
          if (err) {
            dispatch({ type: 'SIGNUP_FAILED', payload: err.response.data });
          }
        }
      });
  };
};
export const userConfirmRequest = userData =>
  dispatch =>
    axios.put(`https://hellobooks-project.herokuapp.com/api/confimation/${userData.key}`, userData)
      .then((res) => {
        const token = res.data.myToken;
        localStorage.setItem('jwt', token);
        setAuthToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
export const userSigninRequest = (data) => {
  const determine = (user) => {
    if (user === 'user') {
      return axios.post(`https://hellobooks-project.herokuapp.com/api/users/signin`, data);
    }
    return axios.post(`https://hellobooks-project.herokuapp.com/api/admin/signin`, data);
  };
  return (dispatch) => {
    dispatch({ type: 'SIGNING_IN' });
    determine(data.signinType)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'SIGN_IN_SUCCESFULLY',
            payload: response,
          });
          // Get token from response and decode it
          const token = response.data.myToken;
          localStorage.setItem('jwt', token);
          setAuthToken(token); // Set token for all requests
          dispatch(setCurrentUser(jwt.decode(token)));
          if (data.signinType === 'user') {
            browserHistory.push('/home');
          } else {
            browserHistory.push('/admin_home');
          }
        }
      }).catch((err) => {
        dispatch({ type: 'SIGNIN_FAILED', payload: err });
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
