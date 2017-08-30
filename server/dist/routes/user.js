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
router.post('/api/v1/users/signup', userController.create);
//  signin user
router.post('/api/v1/users/signin', userController.findUser);
//  api route to allow user borrow book
router.post('/api/v1/users/:userId/:bookId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, _borrowBook2.default.checkStar, borrowBookControllers.borrow);
// get list of borrowed books 
router.get('/api/v1/users/:userId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.getBorrowedBooks);
// api route to allow user return a book;
router.put('/api/v1/users/:userId/:bookId/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookControllers.returnBook);
exports.default = router;