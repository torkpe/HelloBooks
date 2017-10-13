const initialState = {
    fetching: false,
    books: [],
    errors:'',
}
export const getBooks = (state = initialState, action ={}) => {
    switch(action.type) {
        case 'GET_BOOKS': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_BOOKS_SUCCESSFUL':{
            return {
                ...state,
                fetching: false,
                books: action.payload,
            }
        }
        case 'FAILED_TO_GETBOOKS':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
const getExceedsState = {
    fetching: false,
    exceeds: [],
    errors:{}
}
// Get all exceed deadlines
export const getExceeds = (state = getExceedsState, action ={}) => {
    switch(action.type) {
        case 'GET_EXCEEDS': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_BOOKS_EXCEEDS':{
            return {
                ...state,
                fetching: false,
                exceeds: action.payload
            }
        }
        case 'FAILED_TO_GET_EXCEEDS':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
// Get a book
const getABookState = {
    fetching: false,
    books: {},
    errors:{}
}
export const getABook = (state = getABookState, action ={}) => {
    switch(action.type) {
        case 'GET_BOOK': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_BOOK_SUCCESSFUL':{
            return {
                ...state,
                fetching: false,
                books: action.payload
            }
        }
        case 'FAILED_TO_GETBOOK':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
// Borrow a book
const borrowBookState ={
    requesting: false,
    response:{},
    errors:{},
    successfullyBorrowed:false,
}
export const borrowBook = (state = borrowBookState, action ={}) => {
    switch(action.type) {
        case 'BORROW_BOOK': {
            return {...state,
                requesting: true
            }
        }
        case 'BORROW_BOOK_SUCCESSFUL':{
            return {
                ...state,
                requesting: false,
                response: action.payload,
                successfullyBorrowed:true,
            }
        }
        case 'FAILED_TO_BORROW_BOOK':{
            return {
                ...state,
                requesting: false,
                errors: action.payload,
            }
        }
        default: return state;
    }
}
// return a book
const returnBookState ={
    requesting: false,
    response:{},
    errors:{},
    successfullyReturned: false
}
export const returnBook = (state = returnBookState, action ={}) => {
    switch(action.type) {
        case 'RETURN_BOOK': {
            return {...state,
                requesting: true
            }
        }
        case 'RETURN_BOOK_SUCCESSFUL':{
            return {
                ...state,
                requesting: false,
                response: action.payload,
                successfullyReturned:true
            }
        }
        case 'FAILED_TO_RETURN_BOOK':{
            return {
                ...state,
                requesting: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
// Get borrowed books
export const getBorrows = (state = initialState, action ={}) => {
    switch(action.type) {
        case 'GET_BORROWS': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_BORROWS_SUCCESSFUL':{
            return {
                ...state,
                fetching: false,
                books: action.payload
            }
        }
        case 'FAILED_TO_GET_BORROWS':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
const createBookState = {
          isLoading: false,
          resp:{},
          errors:{}
}
// Create book
export const createBook = (state = createBookState, action ={}) => {
    switch(action.type) {
        case 'POST_BOOK': {
            return {
                ...state,
                isLoading: false
            }
        }
        case 'POST_BOOK_SUCCESSFUL':{
            return {
                ...state,
                isLoading: false,
                resp: action.payload
            }
        }
        case 'POST_BOOK_FAILED':{
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
// Edit book
const editBookState = {
    isLoading: false,
    resp:{},
    errors:{}
}
export const editBook = (state = editBookState, action ={}) => {
    switch(action.type) {
        case 'EDIT_BOOK': {
            return {
                ...state,
                isLoading: false
            }
        }
        case 'EDIT_BOOK_SUCCESSFUL':{
            return {
                ...state,
                isLoading: false,
                resp: action.payload
            }
        }
        case 'EDIT_BOOK_FAILED':{
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}