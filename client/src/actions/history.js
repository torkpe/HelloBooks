import axios from 'axios';
import { browserHistory } from 'react-router';

export const getHistory = (val) => {
    return dispatch => {
        if (val ==='all'){
            dispatch({type: 'SWITCH_TO_ALL_BORROWED'})
            return browserHistory.push('/all_borrowed_books')
        }
        else if(val ==='notReturned'){
            dispatch({type: 'SWITCH_TO_ALL_NOT_RETURNED'})
            return browserHistory.push('/not_yet_returned')
        }
    }
}
export const getBorrowHistory = (star, id) => {
    return dispatch =>{
        dispatch({ type: 'GET_HISTORY_OF_BORROWS' })
        axios.get(`https://hellobooks-project.herokuapp.com/api/users/${id}/star/all-borrowed`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_HISTORY_OF_BORROW_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_HISTORY_OF_BORROWS',
                   payload: err.response.data
                })
            }
        });
    }
}

export const getAllBorrowed = (id) => {
    return dispatch =>{
        dispatch({ type: 'GET_ALL_BORROWED_BOOKS' })
        axios.get(`https://hellobooks-project.herokuapp.com/api/users/${id}/books/all-borrowed`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_BORROWED_BOOKS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_BORROWED_BOOKS',
                   payload: err.response.data
                })
            }
        });
    }
}

export const allNotReturned = (id) => {
    return dispatch => {
        dispatch({type: 'GET_NOT_RETURNED_BOOKS'})
        axios.get(`https://hellobooks-project.herokuapp.com/api/users/${id}/books`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_NOT_RETURNED_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_NOT_RETURNED_BOOKS',
                   payload: err
                })
            }
        });
    }
}