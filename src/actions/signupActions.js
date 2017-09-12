import axios from 'axios';

export const userSignupRequest = (userData) => {
    return dispatch => {
        console.log('posted')
        return axios.post('https://hellobooks-project.herokuapp.com/api/users/signup', userData)
    }
}