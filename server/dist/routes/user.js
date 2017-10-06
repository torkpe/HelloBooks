'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middleware = require('../middleware/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _borrowBook = require('../middleware/borrowBook');

var _borrowBook2 = _interopRequireDefault(_borrowBook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = _controllers2.default.users;
var borrowBookControllers = _controllers2.default.borrowBook;
var router = _express2.default.Router();
//  sign up user 
router.post('/api/users/signup', userController.create);
//  signin user
router.post('/api/users/signin', userController.findUser);
// update user upon confirmation
router.put('/api/confimation/:key', userController.updateUser);
//  api route to allow user borrow book
router.post('/api/users/:userId/:bookId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, _borrowBook2.default.checkStar, _borrowBook2.default.checkDebt, borrowBookControllers.borrow);
// get list of borrowed books but not returned
router.get('/api/users/:userId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.getBorrowedBooks);
// get list borrowed books, both borrowed and returned
router.get('/api/users/:userId/books/all-borrowed', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.getAllBorrowedBooks);
// pay back debt
router.put('/api/users/:userId/:bookId/book/payback', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.payBack);
// api route to allow user return a book;
router.put('/api/users/:userId/:bookId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.returnBook);
exports.default = router;