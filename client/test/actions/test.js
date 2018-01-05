import axios from 'axios';
import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import * as mockData from '../mockdata';
import * as apiEndPoints from '../apiEndPoints.js';
import actionTypes from '../../types/types';
import {
  userSignup, userSignin,
  userConfirmationRequest, sendPasswordResetLink,
  resetUserPassword,
} from '../../actions/user';
import {
  getABook, getBooks,
  checkIfBorrowed, getBorrows,
  returnBook, postBook,
  deleteBook, editBook
} from '../../actions/books';
import {
  setPassword
} from '../../actions/changePassword';
import getPdf from '../../actions/getPdf';
import getUser from '../../actions/getUser';
import {
  getAllBorrowed, allNotReturned
} from '../../actions/history';
import {
  getNotification
} from '../../actions/notification';
import {
  updateUser
} from '../../actions/updateUser';

import moclLocalStorage from '../mockDataStorage';

window.localStorage = moclLocalStorage;


const { expect } = chai;
configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});


describe('THUNK FUNCTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  let uniqueUrl = '';
  /*************************/
  /*****USER ACTIONS ******/
  /***********************/
  it('should create SIGN_UP_SUCCESFULLY when a user signs up', async (done) => {
    const signupResponse = mockData.userSignup
    moxios.stubRequest(apiEndPoints.userSignup, {
      status: 201,
      response: signupResponse
    });

    const expectedAction = {
      type: actionTypes.SIGN_UP_SUCCESFULLY,
      userSignupData: signupResponse
    };

    // Dispatch
    await store.dispatch(userSignup(signupResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[1].type).to.equal(expectedAction.type);
        expect(actions[1].payload).to.have.property('message');
        expect(actions[1].payload).to.have.property('key');
      });
      done();
  });
  it('should create CONFIRMATION_SUCCESSFUL when a user is confirmed', async (done) => {
    const confirmResponse = mockData.userConfirmationResponse
    moxios.stubRequest(apiEndPoints.userConfirmationRequest, {
      status: 200,
      response: confirmResponse
    });

    const expectedAction = {
      type: actionTypes.CONFIRMATION_SUCCESSFUL,
      userconfirmationData: confirmResponse
    };

    // Dispatch
    await store.dispatch(userConfirmationRequest(mockData.userSignup))
      .then(() => {
        const actions = store.getActions();
        expect(actions[3].type).to.equal(expectedAction.type);
        expect(actions[3].payload).to.have.property('message');
        expect(actions[3].payload).to.have.property('myToken');
        expect(actions[3].payload).to.have.property('userId');
        expect(typeof(actions[3].payload.userId)).to.equal('number');
        expect(actions[3].payload.userId).to.equal(2);
        expect(actions[3].payload.message).to.equal('Successfully updated');
        expect(actions[3].payload.myToken).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwic3RhciI6ImJyb256ZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1MTMwMDQwNjcsImV4cCI6MTUxMzA5MDQ2N30.wSnWHLLse7hq-ZIQOcuFNvaGwO8UAjiimYJzxjRmFPc');
      });
      done();
  });
  it('should create SIGNIN_SUCCESFUL when a user signs in', async (done) => {
    const signinResponse = mockData.userSigninResponse
    moxios.stubRequest(apiEndPoints.userSignin, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: actionTypes.SIGNIN_SUCCESFUL,
      userSigninData: signinResponse
    };

    // Dispatch
    await store.dispatch(userSignin(signinResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[6].type).to.equal(expectedAction.type);
        expect(actions[6].payload).to.have.property('myToken');
        expect(actions[6].payload).to.have.property('userId');
      });
      done();
  });
  it('should create SEND_RESET_LINK_SUCCESSFUL when reset link is successfully posted', async (done) => {
    const resetLinkResponse = mockData.userResetLinkResponse
    moxios.stubRequest(apiEndPoints.userResetLink, {
      status: 200,
      response: resetLinkResponse
    });
    const expectedAction = {
      type: actionTypes.SEND_RESET_LINK_SUCCESSFUL,
      resetData: resetLinkResponse
    };
    const userEmail = 'jane@doe.com';
    // Dispatch
    await store.dispatch(sendPasswordResetLink('jane@doe.com'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[9].type).to.equal(expectedAction.type);
        expect(actions[9].payload).to.have.property('message');
        expect(actions[9].payload).to.have.property('key');
      });
      done();
  });
  it('should create RESET_PASSWORD_SUCCESSFUL when password is successfully reset', async (done) => {
    const resetPasswordSuccessful = mockData.resetPasswordResponse
    moxios.stubRequest(apiEndPoints.resetUserPasswordUrl, {
      status: 200,
      response: resetPasswordSuccessful
    });
    const expectedAction = {
      type: actionTypes.RESET_PASSWORD_SUCCESSFUL,
      resetData: resetPasswordSuccessful
    };
    const userData = {
      key: 'B7uqPzx9PbOoEW9mCB1z61vAXA7eAscoKTDuzGuRWHnSXbnviE',
      password: {
        password: 'silver',
        confirmPassword: 'silver'
      }
    }
    // Dispatch
    await store.dispatch(resetUserPassword(userData.key, userData.password))
      .then(() => {
        const actions = store.getActions();
        expect(actions[11].type).to.equal(expectedAction.type);
        expect(actions[11].payload).to.have.property('message');
      });
      done();
  });
  /****************************************/
  /*************BOOK ACTIONS**************/
  /**************************************/
  it('should create GET_BOOK_SUCCESSFUL when a user tries to get books', async (done) => {
    const bookResponse = mockData.aBook
    moxios.stubRequest(apiEndPoints.getBook, {
      status: 200,
      response: bookResponse
    });

    const expectedAction = {
      type: actionTypes.GET_BOOK_SUCCESSFUL,
      userSigninData: bookResponse
    };

    // Dispatch
    await store.dispatch(getABook(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[13].type).to.equal(expectedAction.type);
        expect(actions[13].payload).to.have.property('id');
        expect(actions[13].payload).to.have.property('title');
        expect(actions[13].payload).to.have.property('author');
        expect(actions[13].payload).to.have.property('cover');
        expect(actions[13].payload).to.have.property('pdf');
        expect(actions[13].payload).to.have.property('genre');
        expect(actions[13].payload).to.have.property('quantity');
        expect(actions[13].payload).to.have.property('description');
      });
      done();
  });
  it('should create GET_BOOKS_SUCCESSFUL when a user tries to get all books', async (done) => {
    const booksResponse = mockData.getAllBooks
    moxios.stubRequest(apiEndPoints.getBooks, {
      status: 200,
      response: booksResponse
    });

    const expectedAction = {
      type: actionTypes.GET_BOOKS_SUCCESSFUL,
      userSigninData: booksResponse
    };
    // Dispatch
    await store.dispatch(getBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[15].type).to.equal(expectedAction.type);
        expect(actions[15].payload[0]).to.have.property('id');
        expect(actions[15].payload[0]).to.have.property('title');
        expect(actions[15].payload[0]).to.have.property('author');
        expect(actions[15].payload[0]).to.have.property('cover');
        expect(actions[15].payload[0]).to.have.property('pdf');
        expect(actions[15].payload[0]).to.have.property('genre');
        expect(actions[15].payload[0]).to.have.property('quantity');
        expect(actions[15].payload[0]).to.have.property('description');
      });
      done();
  });
  it('should create CHECK_IF_BORROWED_SUCCESSFUL when a user checks if a book is borrowed', async (done) => {
    const checkifBorrowedResponse = mockData.checkIfBorrowedMessage
    moxios.stubRequest(apiEndPoints.checkIfBorrowed, {
      status: 200,
      response: checkifBorrowedResponse
    });

    const expectedAction = {
      type: actionTypes.CHECK_IF_BORROWED_SUCCESSFUL,
      userSigninData: checkifBorrowedResponse
    };
    // Dispatch
    await store.dispatch(checkIfBorrowed(1, 2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[17].type).to.equal(expectedAction.type);
      });
      done();
  });
  it('should create GET_BORROWS_SUCCESSFUL when a user gets all borrowed books', async (done) => {
    const getBorrowsResponse = mockData.getBorrows
    moxios.stubRequest(apiEndPoints.getBorrows, {
      status: 200,
      response: getBorrowsResponse
    });

    const expectedAction = {
      type: actionTypes.GET_BORROWS_SUCCESSFUL,
      borrowsData: getBorrowsResponse
    };
    // Dispatch
    await store.dispatch(getBorrows(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[19].type).to.equal(expectedAction.type);
      });
      done();
  });
  it('should create BORROW_BOOK_SUCCESSFUL when a user borrows a book', async (done) => {
    const getBorrowsResponse = mockData.getBorrows
    moxios.stubRequest(apiEndPoints.getBorrows, {
      status: 200,
      response: getBorrowsResponse
    });

    const expectedAction = {
      type: actionTypes.GET_BORROWS_SUCCESSFUL,
      borrowsData: getBorrowsResponse
    };
    // Dispatch
    await store.dispatch(getBorrows(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[19].type).to.equal(expectedAction.type);
      });
      done();
  });
  it('should create RETURN_BOOK_SUCCESSFUL when a user returns a book', async (done) => {
    const returnResponse = mockData.returnBook
    moxios.stubRequest(apiEndPoints.returnBook, {
      status: 200,
      response: returnResponse
    });

    const expectedAction = {
      type: actionTypes.RETURN_BOOK_SUCCESSFUL,
      borrowsData: returnResponse
    };
    // Dispatch
    await store.dispatch(returnBook(2,1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[23].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create POST_BOOK_SUCCESSFUL when admin adds a new book', async (done) => {
    const createBookResponse = mockData.returnBook
    moxios.stubRequest(apiEndPoints.postBook, {
      status: 201,
      response: createBookResponse
    });

    const expectedAction = {
      type: actionTypes.POST_BOOK_SUCCESSFUL,
      borrowsData: createBookResponse
    };
    // Dispatch
    await store.dispatch(postBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[25].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create DELETE_BOOK_SUCCESSFUL when admin deletes a book', async (done) => {
    const deleteBookResponse = mockData.deleteBook
    moxios.stubRequest(apiEndPoints.deleteBook, {
      status: 200,
      response: deleteBookResponse
    });

    const expectedAction = {
      type: actionTypes.DELETE_BOOK_SUCCESSFUL,
      deleteData: deleteBookResponse
    };
    // Dispatch
    await store.dispatch(deleteBook(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[27].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create EDIT_BOOK_SUCCESSFUL when admin edits a book', async (done) => {
    const editBookResponse = mockData.aBook
    moxios.stubRequest(apiEndPoints.editBook, {
      status: 200,
      response: editBookResponse
    });

    const expectedAction = {
      type: actionTypes.EDIT_BOOK_SUCCESSFUL,
      editBookData: editBookResponse
    };
    // Dispatch
    await store.dispatch(editBook(mockData.aBook,2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[29].type).to.equal(expectedAction.type);
        expect(actions[29].payload).to.have.property('description');
        expect(actions[29].payload).to.have.property('author');
        expect(actions[29].payload).to.have.property('genre');
        expect(actions[29].payload).to.have.property('quantity');
        expect(actions[29].payload).to.have.property('pdf');
        expect(actions[29].payload).to.have.property('cover');
      });
      done();
    })
  it('should create PASSWORD_SUCCESSFULLY_SET when user changes password', async (done) => {
    const changePasswordResponse = mockData.resetPasswordResponse
    moxios.stubRequest(apiEndPoints.setPassword, {
      status: 200,
      response: changePasswordResponse
    });
    const expectedAction = {
      type: actionTypes.PASSWORD_SUCCESSFULLY_SET,
      editBookData: changePasswordResponse
    };
    const password = {
      password: 'silver',
      confirmPassword: 'silver'
    };
    // Dispatch
    await store.dispatch(setPassword(2,password))
      .then(() => {
        const actions = store.getActions();
        expect(actions[31].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create GET_PDF_SUCCESSFUL when request is successful', async (done) => {
    const getPdfResponse = mockData.aBook
    moxios.stubRequest(apiEndPoints.getPdf, {
      status: 200,
      response: getPdfResponse
    });
    const expectedAction = {
      type: actionTypes.GET_PDF_SUCCESSFUL,
      editBookData: getPdfResponse
    };
    // Dispatch
    await store.dispatch(getPdf(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[33].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create GET_USER_SUCCESSFUL when request is successful', async (done) => {
    const getUserResponse = mockData.userDetail
    moxios.stubRequest(apiEndPoints.getUser, {
      status: 200,
      response: getUserResponse
    });
    const expectedAction = {
      type: actionTypes.GET_USER_SUCCESSFUL,
      editBookData: getUserResponse
    };
    // Dispatch
    await store.dispatch(getUser(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[35].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create GET_BORROWED_BOOKS_SUCCESSFUL when request is successful', async (done) => {
    const getUBorrowedBooksResponse = mockData.getAllBooks
    moxios.stubRequest(apiEndPoints.getAllBorrowed, {
      status: 200,
      response: getUBorrowedBooksResponse
    });
    const expectedAction = {
      type: actionTypes.GET_BORROWED_BOOKS_SUCCESSFUL,
      editBookData: getUBorrowedBooksResponse
    };
    // Dispatch
    await store.dispatch(getAllBorrowed(2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[37].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create GET_NOTIFICATION_SUCCESSFUL when request is successful', async (done) => {
    const getNotificationResponse = mockData.getAllBooks
    moxios.stubRequest(apiEndPoints.getNotification, {
      status: 200,
      response: getNotificationResponse
    });
    const expectedAction = {
      type: actionTypes.GET_NOTIFICATION_SUCCESSFUL,
      editBookData: getNotificationResponse
    };
    // Dispatch
    await store.dispatch(getNotification('user',2))
      .then(() => {
        const actions = store.getActions();
        expect(actions[39].type).to.equal(expectedAction.type);
      });
      done();
    })
  it('should create UPDATE_USER_SUCCESSFUL when request is successful', async (done) => {
    const updateUserResponse = mockData.updatedUser
    moxios.stubRequest(apiEndPoints.updateUser, {
      status: 200,
      response: updateUserResponse
    });
    const expectedAction = {
      type: actionTypes.UPDATE_USER_SUCCESSFUL,
      editBookData: updateUserResponse
    };
    const userName = {
      name: 'foo bar'
    };
    // Dispatch
    await store.dispatch(updateUser(2, userName))
      .then(() => {
        const actions = store.getActions();
        expect(actions[41].type).to.equal(expectedAction.type);
      });
      done();
    })
});
