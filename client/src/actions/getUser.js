import axios from 'axios';

export const getUser = (userId) => {
    console.log(userId)
    return dispatch => {
        dispatch({
            type: 'GET_USER'
        })
        return axios.get(`https://hellobooks-project.herokuapp.com/api/users/${userId}`)
        .then(response => {
            if (response) {
                return dispatch({
                    type: 'GET_USER_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch(err=> {
            if (err) {
                return dispatch({
                    type: 'GET_USER_FAILED',
                    payload: err
                })
            }
        })
    }
}
