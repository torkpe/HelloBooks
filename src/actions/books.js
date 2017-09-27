import axios from 'axios';
import sha1 from 'sha1';
import superagent from 'superagent';

export const getBooks = () => {
    return dispatch =>{
        dispatch({ type: 'GET_BOOKS' })
        axios.get('https://hellobooks-project.herokuapp.com/api/books')
        .then((response) => {
            if(response.data){
                dispatch({
                    type: 'GET_BOOKS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err.response){
                dispatch({ type: 'FAILED', payload: err.response.data })
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
                dispatch({
                    type: 'GET_BORROWS_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err.response){
                dispatch({ type: 'FAILED', payload: err.response.data })
            }
        });
    }
}
// Borrow a book
export const borrowBook = (id, bookId) => {
    console.log(id, bookId)
    return dispatch =>{
        dispatch({ type: 'BORROW_BOOK' })
        axios.post(`https://hellobooks-project.herokuapp.com/api/users/${id}/${bookId}/books`)
        .then((response) => {
            if(response.data){
                dispatch({
                    type: 'BORROW_BOOK_SUCCESSFUL',
                    payload: response.data
                })
            }
        }).catch((err) => {
            if(err.response){
                dispatch({ type: 'FAILED', payload: err.response.data })
            }
        });
    }
    // 
}
// Return a book
export const returnBook = (id, bookId) => {
    console.log(id, bookId)
}
export const postBook = (data) => {
    console.log(data.cover)
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
                console.log(err)
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
                    console.log(err)
                    return 
                }
                const pdf = resp.body.url
                data.cover = cover
                data.pdf = pdf
                console.log(data)
                dispatch({ type: 'POST_BOOK'})
                return axios.post(`https://hellobooks-project.herokuapp.com/api/books`, data)
                .then((response) => {
                    if(response){
                        dispatch({ 
                            type: 'POST_BOOK_SUCCESSFUL',
                            payload: response.data
                     })
                        console.log(response)
                    }
                }).catch((err) => {
                    if(err){
                        dispatch({
                            type: 'POST_BOOK_FAILED',
                            payload: err.response.data
                        })
                        console.log(err)
                    }
                })
            })
        })
    
    }
}