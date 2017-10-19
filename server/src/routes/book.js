import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const bookControllers = controllers.book;
const borrowBookController = controllers.borrowBook;
const router = express.Router();
// add a book
router.post('/api/books', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.create);
// get all books
router.get('/api/books', authorize.checkAuthentication, bookControllers.findAll);
// get a book
router.get('/api/books/:id', authorize.checkAuthentication, bookControllers.findOne);
// edit a book
router.put('/api/books/:id', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.findBook);
// Delete a book
router.put('/api/books/:id/delete', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.deleteBook);
// API route to allow book delete a book goes in here
router.put('/api/books/:id', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.deleteBook);
// Check if the book has been borrowed already
router.get('/api/book/:id', authorize.checkAuthentication, authorize.authorizeAdmin, borrowBookController.getABorrowed);

export default router;
