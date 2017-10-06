import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';
import authBorrow from '../middleware/borrowBook';

const userController = controllers.users;
const borrowBookControllers = controllers.borrowBook;
const router = express.Router();
//  sign up user 
router.post('/api/users/signup', userController.create);
//  signin user
router.post('/api/users/signin', userController.findUser);
// update user upon confirmation
router.put('/api/confimation/:key', userController.updateUser);
//  api route to allow user borrow book
router.post('/api/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser,
  authBorrow.checkStar, authBorrow.checkDebt, borrowBookControllers.borrow);
// get list of borrowed books but not returned
router.get('/api/users/:userId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getBorrowedBooks);
// get list borrowed books, both borrowed and returned
router.get('/api/users/:userId/books/all-borrowed', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.getAllBorrowedBooks);
router.put('/api/users/:userId/books/payback', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.payBack);
// api route to allow user return a book;
router.put('/api/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser,
  borrowBookControllers.returnBook);
export default router;
