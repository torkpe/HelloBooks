import axios from 'axios';
import jwt from 'jsonwebtoken'
import setAuthToken from '../utils/setAuthToken';
import { browserHistory } from 'react-router';

import { SET_CURRENT_USER } from './types';

export const userSignupRequest = (userData) => {
    const determine = (user) => {
        if(user==='user'){
            return axios.post('https://hellobooks-project.herokuapp.com/api/users/signup', userData)
        }
        return axios.post('https://hellobooks-project.herokuapp.com/api/admin/signup', userData)
    }
    return dispatch =>{
        dispatch({ type: 'SIGNING_UP' })
        determine(userData.signupType)
        .then((response) => {
            if(response){
                dispatch({
                    type: 'SIGN_UP_SUCCESFULLY'
                })
                browserHistory.push('/redirect');
            }
        }).catch((err) => {
            if(err){
                if(err.response.data){
                dispatch({ type: 'SIGNUP_FAILED', payload: err.response.data })
            }
            }
        });
    }
}
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export const userConfirmRequest = (userData) => {
    return dispatch => {
        return axios.put(`https://hellobooks-project.herokuapp.com/api/confimation/${userData.key}`, userData)
        .then(res => {
            const token = res.data.myToken
            localStorage.setItem('jwt', token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}
export const userSigninRequest = (data) => {
    return dispatch =>{
        dispatch({ type: 'SIGNING_IN' })
        axios.post(`https://hellobooks-project.herokuapp.com/api/users/signin`, data)
        .then((response) => {
            if (response) {
                dispatch({
                    type: 'SIGN_IN_SUCCESFULLY',
                    payload: response
                })
                // Get token from response and decode it
                const token = response.data.myToken
                localStorage.setItem('jwt', token);
                setAuthToken(token); //Set token for all requests
                dispatch(setCurrentUser(jwt.decode(token)));
                browserHistory.push('/home');
            }
        }).catch((err) => {
            dispatch({ type: 'SIGNIN_FAILED', payload: err })
        })
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwt');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}
