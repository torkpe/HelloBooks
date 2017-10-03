import axios from 'axios';

export const notify = (data) => {
    return dispatch =>{
        dispatch({ type: 'POST_NOTIFICATION' })
        axios.post('http://localhost:8080/api/notifications')
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'POST_NOTIFICATION_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILD_TO_POST_NOTIFICATION',
                   payload: err
                })
            }
        });
    }
}
export const getNotification = (category) => {
    const determineCat = (category) =>{
        if (category==='admin'){
            return axios.get('http://localhost:8080/api/notifications/admin')
        }
        return axios.get('http://localhost:8080/api/notifications/user')
    }
    return dispatch =>{
        dispatch({ type: 'GET_NOTIFICATION' })
        determineCat(category)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_NOTIFICATION_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_NOTIFICATION',
                   payload: err
                })
            }
        });
    }
}