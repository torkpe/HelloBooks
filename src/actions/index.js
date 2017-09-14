import axios from 'axios';
import jwt from 'jsonwebtoken'
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export const userSignupRequest = (userData) => {
    return dispatch => {
        console.log('posted')
        return axios.post('https://hellobooks-project.herokuapp.com/api/users/signup', userData)
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
        console.log('confirmed')
        return axios.put(`https://hellobooks-project.herokuapp.com/api/confimation/${userData.key}`, userData)
        .then(res => {
            const token = res.data.myToken
            localStorage.setItem('jwt', token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
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