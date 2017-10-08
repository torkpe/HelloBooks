import axios from 'axios';

export const payBack = (userId, bookId) => {
    console.log(userId, bookId)
    return dispatch =>{
        dispatch({ type: 'PAY_BACK' })
        axios.put(`https://hellobooks-project.herokuapp.com/api/users/${userId}/${bookId}/book/payback`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'PAY_BACK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'PAY_BACK_FAILED',
                   payload: err
                })
            }
        });
    }
    // 
}
