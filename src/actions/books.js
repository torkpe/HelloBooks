import axios from 'axios';

export const getBooks = () => {
    return dispatch =>{
        dispatch({ type: 'GET_BOOKS' })
        axios.get('https://hellobooks-project.herokuapp.com/api/books')
        .then((response) => {
            if(response){
                dispatch({
                    type: 'GET_BOOKS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            dispatch({ type: 'FAILED', payload: err.response.data })
        });
    }
}