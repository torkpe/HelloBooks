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
export const getNotifictaion = (data) => {
    return dispatch =>{
        dispatch({ type: 'GET_NOTIFICATION' })
        axios.get('http://localhost:8080/api/notifications/user')
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