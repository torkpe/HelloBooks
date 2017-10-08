import axios from 'axios';
import sha1 from 'sha1';
import superagent from 'superagent';

// Get all books
export const getBooks = () => {
    return dispatch =>{
        dispatch({ type: 'GET_BOOKS' })
        axios.get('https://hellobooks-project.herokuapp.com/api/books')
        .then((response) => {
            if(response.data){
               return dispatch({
                    type: 'GET_BOOKS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
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
        axios.post(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`, data)
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
    // 
}

export const postBook = (data) => {
    return dispatch => {
        dispatch({type: 'UPLOAD_COVER'})
        const cloudName = 'hellobooks'
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/auto/upload'
        const url1 = 'https://api.cloudinary.com/v1_1/'+cloudName+'/auto/upload'
        const timestamp = Date.now()/1000
        const uploadPreset = 'wad3pvmg'
        const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'8c060McBdeyZClXXNfNgpG8QqXU'
        const signature = sha1(paramsStr)
        const params = {
            'api_key': '521381859673832',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }
        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', data.cover)
        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })
        uploadRequest.end((err, resp) => {
            if(err){
            dispatch({type: 'UPLOAD_COVER_FAILED'})
                return 
            }
            const cover = resp.body.url
            dispatch({type: 'UPLOAD_PDF'})
            let uploadRequest = superagent.post(url1)
            uploadRequest.attach('file', data.pdf)
            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })
            uploadRequest.end((err, resp) => {
                if(err){
                    dispatch({type: 'UPLOAD_PDF_FAILED'})
                    return 
                }
                const pdf = resp.body.url
                data.cover = cover
                data.pdf = pdf
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
            })
        })
    
    }
}