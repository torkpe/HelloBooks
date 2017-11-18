import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';
import authBorrow from '../middleware/borrowBook';
import validator from '../middleware/validator';

const userController = controllers.users;
const borrowBookControllers = controllers.borrowBook;
const requestsController = controllers.requests;
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
  authBorrow.checkStar, authBorrow.checkDebt, borrowBookControllers.borrow
);
// get list of borrowed books but not returned
router.get(
  '/users/:userId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getBorrowedBooks
);
// get list borrowed books, both borrowed and returned
router.get(
  '/users/:userId/books/all-borrowed', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getAllBorrowedBooks
);
// pay back debt
router.put(
  '/users/:userId/:bookId/book/payback', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.payBack
);
// api route to allow user return a book;
router.put(
  '/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.returnBook
);
// Api to set password
router.put(
  '/users/setPassword/:id', authorize.checkAuthentication, authorize.authorizeUser,
  userController.setPassword
);
// update usernamne
router.put(
  '/users/updateUser/:id', authorize.checkAuthentication, authorize.authorizeUser,
  userController.updateName
);
// get list of borrowed books but not returned
router.get(
  '/users/:userId', authorize.checkAuthentication, authorize.authorizeUser,
  userController.getUser
);
router.post(
  '/users/requests', authorize.checkAuthentication, authorize.authorizeUser,
  requestsController.createRequest
);
export default router;
