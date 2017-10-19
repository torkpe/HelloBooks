import axios from 'axios';
import sha1 from 'sha1';
import superagent from 'superagent';

// Get all books
export const getBooks = () => {
    return dispatch =>{
        dispatch({ type: 'GET_BOOKS' })
        axios.get('https://hellobooks-project.herokuapp.com/api/books')
        .then(response => {
            if(response.data){
               return dispatch({
                    type: 'GET_BOOKS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch(err => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GETBOOKS',
                   payload: err
                })
            }
        });
    }
}
// Get all books exceeding deadline
export const exceedDeadlines = () => {
    return dispatch =>{
        dispatch({ type: 'GET_EXCEEDS' })
        axios.get('https://hellobooks-project.herokuapp.com/api/admins/exceed-deadlines')
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_BOOKS_EXCEEDS',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_EXCEEDS',
                   payload: err
                })
            }
        });
    }
}
// Get a book
export const getABook = (id) => {
    return dispatch =>{
        dispatch({ type: 'GET_BOOK' })
        axios.get(`https://hellobooks-project.herokuapp.com/api/books/${id}`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GETBOOK',
               payload: err.response.data
            })
            }
        });
    }
}
//get list of borrowed books
export const getBorrows = (id) => {
    return dispatch =>{
        dispatch({ type: 'GET_BORROWS' })
        axios.get(`https://hellobooks-project.herokuapp.com/api/users/${id}/books`)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_BORROWS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_GET_BORROWS',
                   payload: err
                })
            }
        });
    }
}
// Borrow a book
export const borrowBook = (id, bookId, data) => {
    return dispatch =>{
        dispatch({ type: 'BORROW_BOOK' })
        return axios.post(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`, data)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'BORROW_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_BORROW_BOOK',
                   payload: err
                })
            }
        });
    }
}
// Return a book
export const returnBook = (id, bookId, data) => {
    return dispatch =>{
        dispatch({ type: 'RETURN_BOOK' })
        axios.put(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`, data)
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'RETURN_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
               return dispatch({
                   type: 'FAILED_TO_RETURN_BOOK',
                   payload: err.response.data
                })
            }
        });
    }
}

// Post a book
export const postBook = (data) => {
    console.log(data)
    return dispatch => {
        dispatch({ type: 'POST_BOOK'})
        return axios.post(`https://hellobooks-project.herokuapp.com/api/books`, data)
        .then((response) => {
            if(response.data){
                return dispatch({ 
                    type: 'POST_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err){
                if(err.data)
                return dispatch({
                    type: 'POST_BOOK_FAILED',
                    payload: err.response.data
                })
            }
        })
    }
}

// Delete a book 
export const deleteBook = (data) => {
    console.log(data)
    return dispatch => {
        dispatch({type: 'DELETE_BOOK'})
        return axios.put(`https://hellobooks-project.herokuapp.com/api/books/${data}/delete`)
        .then((response) => {
            if(response.data) {
                return dispatch({
                    type: 'DELETE_BOOK_SUCCESSFUL',
                    poayLoad: response.data
                })
            }
        }).catch((err) => {
            if(err) {
                if(err.data) {
                    return dispatch({
                        type: 'DELETE_BOOK_FAILED',
                        poayLoad: err.data
                    })
                }
            }
        })
    }
}
// Edit a book
export const editBook = (data, bookId) => {
    console.log(data)
    return dispatch => {
        dispatch({type: 'EDIT_BOOK'})
        return axios.put(`https://hellobooks-project.herokuapp.com/api/books/${bookId}`, data)
        .then((response) => {
            if (response.data) {
                return dispatch({
                    type: 'EDIT_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        })
        .catch(err => {
            if (err.data) {
                return dispatch({
                    type: 'EDIT_BOOK_FAILED',
                    payload: err
                })
            }
        })
    }
}