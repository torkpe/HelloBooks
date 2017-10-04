import axios from 'axios';

const data ={
    owing: true
}
export const chargeUser = (userId, bookId) => {
    return dispatch => {
        dispatch({
            type: 'CHARGE_USER'
        })
        return axios.put(`https://hellobooks-project.herokuapp.com/api/admins/charge-user/${userId}/${bookId}`, data)
        .then(response => {
            if (response) {
                return dispatch({
                    type: 'SUCCESSFULLY_CHARGED_USER',
                    payload: response.data
                })
            }
        }).catch(err=> {
            if (err) {
                return dispatch({
                    type: 'CHARGE_USER_FAILED',
                    payload: err
                })
            }
        })
    }
}
