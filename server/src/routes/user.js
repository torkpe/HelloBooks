import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const userController = controllers.users;
const borrowBookControllers = controllers.borrowBook;
const router = express.Router();
//  sign up user
router.post('/api/v1/users/signup', userController.create);
//  signin user
router.post('/api/v1/users/signin', userController.findUser);
//  api route to allow user borrow book
router.post('/api/v1/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser, borrowBookControllers.borrow);
// get list of borrowed books
router.get('/api/v1/users/:userId/books', authorize.checkAuthentication, authorize.authorizeUser, borrowBookControllers.getBorrowedBooks);
// api route to allow user return a book;
router.put('/api/v1/users/:userId/:bookId/books', authorize.checkAuthentication, authorize.authorizeUser, borrowBookControllers.returnBook);
export default router;
