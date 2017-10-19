import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';
import { getBooks, createBook, getBorrows, borrowBook, returnBook, getABook, getExceeds, editBook, deleteBook } from './book';
import { getAllBorrowed, allNotReturned, getBorrowHistory } from './history';
import { notify, getNotification } from './notification';
import charge from './charge';
import payback from './payback';
import { getPdf } from './getPdf';
import changePassword from './changePassword';
import updateUser from './updateUser';
import { getUser } from './getUser';
import { uploadCover, uploadPdf } from './upload';

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
    charge,
    payback,
    getPdf,
    changePassword,
    updateUser,
    getUser,
    uploadCover,
    uploadPdf,
    editBook,
    deleteBook,
    getBorrowHistory
});

export default rootReducer;
