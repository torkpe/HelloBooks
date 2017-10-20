import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';
import { getBooks, createBook, getBorrows, borrowBook, returnBook, getABook, getExceeds } from './book';
import { getAllBorrowed, allNotReturned } from './history';
import { notify, getNotification } from './notification';
import charge from './charge';

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
    getNotification,
    getExceeds,
    charge
});

export default rootReducer;
