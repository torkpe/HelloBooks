import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';
import { getBooks, createBook, getBorrows, borrowBook, returnBook, getABook } from './book';
import { getAllBorrowed, allNotReturned } from './history';
import { notify, getNotification } from './notification';

const rootReducer = combineReducers({
    auth,
    signin,
    signup,
    getBooks,
    createBook,
    getBorrows,
    borrowBook,
    returnBook,
    getABook,
    getAllBorrowed,
    allNotReturned,
    notify,
    getNotification
});

export default rootReducer;
