import axios from 'axios';

export const updateUser = (userId, body) => {
    return dispatch => {
        dispatch ({
            type: 'UPDATE_USER'
        })
        return axios.put(`https://hellobooks-project.herokuapp.com/api/users/updateUser/${userId}`, body)
        .then(response => {
            if (response) {
                return dispatch({
                    type: 'UPDATE_USER_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch(err=> {
            if (err) {
                return dispatch({
                    type: 'UPDATE_USER_FAILED',
                    payload: err
                })
            }
        })
    }
}