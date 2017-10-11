import axios from 'axios';

export const getPdf = (id) => {
    return dispatch =>{
        dispatch({ type: 'GET_PDF' })
        axios.get(`https://hellobooks-project.herokuapp.com/api/books/${id}`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_PDF_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_PDF',
               payload: err.response.data
            })
            }
        });
    }
}