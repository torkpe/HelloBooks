import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';
import authBorrow from '../middleware/borrowBook';
import validator from '../middleware/validator';

const userController = controllers.users;
const borrowBookControllers = controllers.borrowedBook;
const requestsController = controllers.requests;
const notificationsController = controllers.notification;
const router = express.Router();
//  sign up user
router.post('/users/signup', userController.create);
//  signin user
router.post('/users/signin', userController.signin);
// update user upon confirmation
router.put('/confirmation/:key', userController.updateUser);
//  api route to allow user borrow book
router.post(
  '/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser,
  authBorrow.checkStar, authBorrow.checkForExceededDeadline, borrowBookControllers.borrow
);
// get list of borrowed books but not returned
router.get(
  '/users/:userId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getBorrowedBooks
);
// get list borrowed books, both borrowed and returned
router.get(
  '/users/:userId/books/all-borrowed', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getHistory
);
// api route to allow user return a book;
router.put(
  '/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.returnBook
);
// Api to set password
router.put(
  '/users/change-password/:id', authorize.checkAuthentication, authorize.authorizeUser,
  userController.changePassword
);
// update username
router.put(
  '/users/update-user/:id', authorize.checkAuthentication, authorize.authorizeUser,
  userController.updateName
);
router.get(
  '/users/:userId', authorize.checkAuthentication, authorize.authorizeUser,
  userController.getUser
);
// reset password
router.put('/users/reset-password/:key', userController.resetPassword);
// send password reset link
router.post('/users/send-password-reset-link', userController.sendResetLink);

export default router;
