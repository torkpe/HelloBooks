import axios from 'axios';

import url from '../utils/url';

export const setPassword = (userId, body) => {
    console.log(body)
    return dispatch => {
        dispatch ({
            type: 'SET_PASSWORD'
        })
        return axios.put(`${url}/users/setPassword/${userId}`, body)
        .then(response => {
            if (response) {
                return dispatch({
                    type: 'PASSWORD_SUCCESSFULLY_SET',
                    payload: response.data
                })
            }
        }).catch(err=> {
            if (err) {
                return dispatch({
                    type: 'PASSWORD_SET_FAILED',
                    payload: err
                })
            }
        })
    }
}