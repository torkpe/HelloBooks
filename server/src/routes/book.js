import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';
import validator from '../middleware/validator';

const bookControllers = controllers.book;
const borrowBookController = controllers.borrowedBook;
const router = express.Router();
// add a book
router.post('/books', authorize.checkAuthentication, authorize.authorizeAdmin, validator.bookValidator, bookControllers.create);
// get all books
router.get('/books', authorize.checkAuthentication, bookControllers.findAllBooks);
// get a book
router.get('/books/:id', authorize.checkAuthentication, bookControllers.findABook);
// edit a book
router.put('/books/:id', authorize.checkAuthentication, authorize.authorizeAdmin, validator.bookValidator, bookControllers.editBook);
// Delete a book
router.put('/books/:id/delete', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.deleteBook);
// Check if the book has been borrowed already
router.get('/book/:id/:userId', authorize.checkAuthentication, authorize.authorizeUser, borrowBookController.getABorrowedBook);

export default router;
