import isEmpty from 'lodash/isEmpty';
import authReducer from '../../reducers/auth';
import {
  getBooks, getABook,
  borrowBook, returnBook, returnBookState,
  getBorrows, createBook, deleteBook,
  editBook
} from '../../reducers/book';
import setPassword from '../../reducers/changePassword';
import getPdf from '../../reducers/getPdf';
import getUser from '../../reducers/getUser';
import updateUser from '../../reducers/updateUser';
import {
  getAllBorrowed, allNotReturned
} from '../../reducers/history';
import {
  uploadCover, uploadPdf
} from '../../reducers/upload';
import * as user from '../../reducers/user';
import {
  getNotification
} from '../../reducers/notification';
import * as mockData from '../mockData';
import types from '../../types/types';

const {
  checkIfBorrowedMessage, errorMessage,
  getAllBooks, booksInitialState,
  aBook, bookInitialState,
  borrowBookMessage, borrowBookState,
  returnBookMessage, createdBook,
  createBookState, deleteBookState,
  deleteBookResponse, editBookResponse,
  editBookState, setPasswordState,
  setPasswordResponse, getPdfState,
  getUserState, userDetail,
  allBorrowsInitialState, notReturnedState,
  notificationState, uploadFileInitialState,
  cover, pdf, userSignup, userSigninResponse,
  signupInitialState, userConfirmationResponse,
  confirmationInitalState, resetUserPassword,
  signinInitialState
} = mockData;

describe('Auth reducer', () => {
  it('should set user to empty when current user is undefined', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should handle current user', () => {
    const { userDetailsDecoded } = mockData;
    expect(authReducer({
      type: types.SET_CURRENT_USER,
      isAuthenticated: !isEmpty(userDetailsDecoded),
      user: userDetailsDecoded,
    })).toEqual({
      type: types.SET_CURRENT_USER,
      isAuthenticated: !isEmpty(userDetailsDecoded),
      user: userDetailsDecoded
    });
  });
});

describe('Books', () => {
  it('should return an array of books', () => {
    expect(getBooks(booksInitialState, {
      type: types.GET_BOOKS_SUCCESSFUL,
      payload: getAllBooks,
      fetching: false,
      errors: '',
    })).toEqual({
      fetching: false,
      errors: '',
      books: getAllBooks
    });
  });
  it('should return an error message if no response', () => {
    expect(getBooks({
      fetching: false,
      errors: '',
    }, {
      type: types.FAILED_TO_GET_BOOKS,
      payload: checkIfBorrowedMessage,
      fetching: false,
    })).toEqual({
      errors: checkIfBorrowedMessage,
      fetching: false
    });
  });
  it('should return a message for successful borrow', () => {
    expect(borrowBook(borrowBookState, {
      type: types.BORROW_BOOK_SUCCESSFUL,
      payload: borrowBookMessage,
      requesting: false,
    })).toEqual({
      response: borrowBookMessage,
      requesting: false,
      errors: {},
      successfullyBorrowed: true
    });
  });
  it('should return an error for unsuccessful borrow', () => {
    expect(borrowBook(borrowBookState, {
      type: types.FAILED_TO_BORROW_BOOK,
      payload: errorMessage,
      requesting: false,
    })).toEqual({
      response: {},
      requesting: false,
      errors: errorMessage,
      successfullyBorrowed: false
    });
  });
  it('should return an error for unsuccessful borrow', () => {
    expect(borrowBook(borrowBookState, {
      type: types.CLEAR_BORROW_BOOK_STATE,
      requesting: false,
      response: {},
      errors: {},
      successfullyBorrowed: false,
    })).toEqual({
      response: {},
      requesting: false,
      errors: {},
      successfullyBorrowed: false
    });
  });
  it('should return a message for successful return', () => {
    expect(returnBook(returnBookState, {
      type: types.RETURN_BOOK_SUCCESSFUL,
      payload: returnBookMessage,
      successfullyreturned: true
    })).toEqual({
      response: returnBookMessage,
      requesting: false,
      errors: {},
      successfullyReturned: true
    });
  });
  it('should return an error for unsuccessful return', () => {
    expect(returnBook(returnBookState, {
      type: types.FAILED_TO_RETURN_BOOK,
      payload: errorMessage,
      requesting: false,
    })).toEqual({
      response: {},
      requesting: false,
      errors: errorMessage,
      successfullyReturned: false
    });
  });
  it('should return an array of borrowed books', () => {
    expect(getBorrows(booksInitialState, {
      type: types.GET_BORROWS_SUCCESSFUL,
      payload: getAllBooks,
      fetching: false,
      errors: '',
    })).toEqual({
      fetching: false,
      errors: '',
      books: getAllBooks
    });
  });
  it('should return an error for unsuccessful return', () => {
    expect(getBorrows(booksInitialState, {
      type: types.FAILED_TO_GET_BORROWS,
      payload: errorMessage,
      fetching: false,
    })).toEqual({
      books: [],
      fetching: false,
      errors: errorMessage,
    });
  });
  it('should return an object for successful book creation', () => {
    expect(createBook(createBookState, {
      type: types.POST_BOOK_SUCCESSFUL,
      payload: {
        newBook: createdBook
      },
      isLoading: false,
      errors: {},
    })).toEqual({
      errors: {},
      isLoading: false,
      book: createdBook
    });
  });
  it('should return an error for unsuccessful return', () => {
    expect(createBook(createBookState, {
      type: types.FAILED_TO_POST_BOOK,
      payload: errorMessage,
      isLoading: false,
    })).toEqual({
      isLoading: false,
      book: {},
      message: '',
      errors: errorMessage,
    });
  });
  it('should return an object for successful book delete', () => {
    expect(deleteBook(deleteBookState, {
      type: types.DELETE_BOOK_SUCCESSFUL,
      payLoad: deleteBookResponse,
      isLoading: false,
      error: {},
    })).toEqual({
      error: {},
      isLoading: false,
      response: deleteBookResponse
    });
  });
  it('should return an object for unsuccessful book delete', () => {
    expect(deleteBook(deleteBookState, {
      type: types.FAILED_TO_DELETE_BOOK,
      payload: deleteBookResponse,
      isLoading: false,
    })).toEqual({
      error: deleteBookResponse,
      isLoading: false,
      response: {}
    });
  });
  it('should return an object for successful book update', () => {
    expect(editBook(editBookState, {
      type: types.EDIT_BOOK_SUCCESSFUL,
      payload: editBookResponse,
      isLoading: false,
      error: {},
    })).toEqual({
      error: {},
      isLoading: false,
      book: editBookResponse
    });
  });
  it('should return error for unscuccessful update', () => {
    expect(editBook(editBookState, {
      type: types.FAILED_TO_EDIT_BOOK,
      payload: errorMessage,
      isLoading: false,
      error: {},
    })).toEqual({
      error: errorMessage,
      isLoading: false,
      book: {}
    });
  });
});

describe('Set password', () => {
  it('update state with success response if password set is successful', () => {
    expect(setPassword(setPasswordState, {
      type: types.PASSWORD_SUCCESSFULLY_SET,
      payload: setPasswordResponse,
      isLoading: false,
      errors: {},
    })).toEqual({
      response: setPasswordResponse,
      isLoading: false,
      errors: {}
    });
  });
  it('update state with failure response if password set is unsuccessful', () => {
    expect(setPassword(setPasswordState, {
      type: types.FAILED_TO_SET_PASSWORD,
      payload: errorMessage,
      isLoading: false,
    })).toEqual({
      response: {},
      isLoading: false,
      errors: errorMessage
    });
  });
});

describe('Get pdf', () => {
  it('update state with success response if pdf is successfully gotten', () => {
    expect(getPdf(getPdfState, {
      type: types.GET_PDF_SUCCESSFUL,
      payload: aBook,
      fetching: false,
      errors: '',
    })).toEqual({
      books: aBook,
      fetching: false,
      errors: ''
    });
  });
  it('update state with failure response if get pdf is unsuccessful', () => {
    expect(getPdf(getPdfState, {
      type: types.FAILED_TO_GET_PDF,
      payload: errorMessage,
      fetching: false,
    })).toEqual({
      books: {},
      fetching: false,
      errors: errorMessage
    });
  });
});
describe('Get User', () => {
  it('update state with user details when successful', () => {
    expect(getUser(getUserState, {
      type: types.GET_USER_SUCCESSFUL,
      payload: aBook,
      fetching: false,
      errors: '',
    })).toEqual({
      user: aBook,
      fetching: false,
      errors: ''
    });
  });
  it('update state with failure response if get user is unsuccessful', () => {
    expect(getUser(getUserState, {
      type: types.FAILED_TO_GET_USER,
      payload: errorMessage,
      fetching: false,
    })).toEqual({
      user: {},
      fetching: false,
      errors: errorMessage
    });
  });
});
describe('Get all borrowed', () => {
  it('update state with success if all borrows are returned', () => {
    expect(getAllBorrowed(allBorrowsInitialState, {
      type: types.GET_BORROWED_BOOKS_SUCCESSFUL,
      payload: getAllBooks,
      isLoading: false,
      errors: {},
    })).toEqual({
      borrowedBooks: getAllBooks,
      isLoading: false,
      errors: {}
    });
  });
});
describe('Get all not returned', () => {
  it('update state with success if allNotReturneds are returned', () => {
    expect(allNotReturned(notReturnedState, {
      type: types.GET_NOT_RETURNED_SUCCESSFUL,
      payload: getAllBooks,
      isLoading: false,
      errors: {},
    })).toEqual({
      notReturned: getAllBooks,
      isLoading: false,
      errors: {}
    });
  });
});
describe('Get all notifications', () => {
  it('update state with success if allNotReturneds are returned', () => {
    expect(getNotification(notificationState, {
      type: types.GET_NOTIFICATION_SUCCESSFUL,
      payload: getAllBooks,
      fetching: false,
      errors: {},
    })).toEqual({
      notifications: getAllBooks,
      fetching: false,
      errors: {}
    });
  });
});
describe('Upload cover', () => {
  it('should update state when upload cover is successful', () => {
    expect(uploadCover(uploadFileInitialState, {
      type: types.UPLOAD_COVER_SUCCESSFUL,
      payLoad: cover,
      isLoading: false,
      errors: {}
    })).toEqual({
      uploaded: cover,
      isLoading: false,
      errors: {}
    });
  });
});
describe('Upload Pdf', () => {
  it('should update stat when upload pdf is successful ', () => {
    expect(uploadPdf(uploadFileInitialState, {
      type: types.UPLOAD_PDF_SUCCESSFUL,
      payLoad: pdf,
      isLoading: false,
      errors: {}
    })).toEqual({
      uploaded: pdf,
      isLoading: false,
      errors: {}
    });
  });
});
describe('User reducer', () => {
  it('should update state when user signs up successfully', () => {
    expect(user.userSignup(signupInitialState, {
      type: types.SIGN_UP_SUCCESFULLY,
      payload: userSignup,
      isLoading: false,
      errors: {}
    })).toEqual({
      successfullySignedup: userSignup,
      isLoading: false,
      errors: {}
    });
  });
  it('should update state when user is successfully updated', () => {
    expect(user.userConfirmationRequest(confirmationInitalState, {
      type: types.CONFIRMATION_SUCCESSFUL,
      payload: userConfirmationResponse,
    })).toEqual({
      confirmationSuccessful: userConfirmationResponse,
      isLoading: false,
      errors: {},
    });
  });
  it('should update state when a user successfully reset password', () => {
    expect(user.resetPassword(resetUserPassword, {
      type: types.RESET_PASSWORD_SUCCESSFUL,
      payload: userConfirmationResponse,
    })).toEqual({
      successfullyResetPassword: userConfirmationResponse,
      isLoading: false,
      error: {},
    });
  });
  it('should update state when a user successfully reset password', () => {
    expect(user.userSignin(signinInitialState, {
      type: types.SIGNIN_SUCCESFUL,
      payload: userConfirmationResponse,
    })).toEqual({
      successfullySignedin: userConfirmationResponse,
      isLoading: false,
      errors: {},
    });
  });
});
