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

var _validator = require('../middleware/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookControllers = _controllers2.default.book;
var borrowBookController = _controllers2.default.borrowBook;
var router = _express2.default.Router();
// add a book
router.post('/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, _validator2.default.bookValidator, bookControllers.create);
// get all books
router.get('/books', _middleware2.default.checkAuthentication, bookControllers.findAll);
// get a book
router.get('/books/:id', _middleware2.default.checkAuthentication, bookControllers.findOne);
// edit a book
router.put('/books/:id', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.findBook);
// Delete a book
router.put('/books/:id/delete', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.deleteBook);
// API route to allow book delete a book goes in here
router.put('/books/:id', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.deleteBook);
// Check if the book has been borrowed already
router.get('/book/:id/:userId', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, borrowBookController.getABorrowed);

exports.default = router;