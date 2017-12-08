import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import auth from './auth';
import { getBooks, createBook, getBorrows,
  borrowBook, returnBook, getABook,
  editBook, deleteBook,
  checkIfBorrowed,
} from './book';
import { getAllBorrowed, allNotReturned, getBorrowHistory } from './history';
import { notify, getNotification } from './notification';
import getPdf from './getPdf';
import changePassword from './changePassword';
import updateUser from './updateUser';
import getUser from './getUser';
import { uploadCover, uploadPdf } from './upload';
import { userSignup, userConfirmationRequest, userSignin } from './user';

const rootReducer = combineReducers({
  auth,
  userSignin,
  userSignup,
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
  getPdf,
  changePassword,
  updateUser,
  getUser,
  uploadCover,
  uploadPdf,
  editBook,
  deleteBook,
  getBorrowHistory,
  checkIfBorrowed,
  toastr,
  userConfirmationRequest
});

export default rootReducer;
