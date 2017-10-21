import axios from 'axios';

export const notify = (data) => {
    return dispatch =>{
        dispatch({ type: 'POST_NOTIFICATION' })
        console.log('hi')
        axios.post('https://hellobooks-project.herokuapp.com/api/notifications', data)
        .then((response) => {
            console.log('there')
            if(response.data){
                console.log(response.data)
               return dispatch({
                    type: 'POST_NOTIFICATION_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_POST_NOTIFICATION',
                   payload: err
                })
            }
        });
    }
}
export const getNotification = (category) => {
    const determineCat = (category) =>{
        if (category==='admin'){
            return axios.get('https://hellobooks-project.herokuapp.com/api/notifications/admin')
        }
        return axios.get('https://hellobooks-project.herokuapp.com/api/notifications/user')
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