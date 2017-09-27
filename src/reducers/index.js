import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';
import { getBook, createBook, getBorrows, borrowBook } from './book';

const rootReducer = combineReducers({
    auth,
    signin,
    signup,
    getBook,
    createBook,
    getBorrows,
    borrowBook,
});

export default rootReducer;
