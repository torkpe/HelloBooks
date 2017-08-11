import express from 'express';
import controllers from '../controllers';
import authorize from '../middleware/middleware';

const bookControllers = controllers.book;
const router = express.Router();
// add a book
router.post('/api/v1/books', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.create);
// get all books
router.get('/api/v1/books', authorize.checkAuthentication, bookControllers.findAll);
// get a book
router.get('/api/v1/books/:id', authorize.checkAuthentication, bookControllers.findOne);
// edit a book
router.put('/api/v1/books/:id', authorize.checkAuthentication, authorize.authorizeAdmin, bookControllers.findBook);
// Delete a book
// API route to allow book delete a book goes in here

export default router;
