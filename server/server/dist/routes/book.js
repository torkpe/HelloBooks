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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookControllers = _controllers2.default.book;
var router = _express2.default.Router();
// add a book
router.post('/api/books', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.create);
// get all books
router.get('/api/books', _middleware2.default.checkAuthentication, bookControllers.findAll);
// get a book
router.get('/api/books/:id', _middleware2.default.checkAuthentication, bookControllers.findOne);
// edit a book
router.put('/api/books/:id', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.findBook);
// Delete a book
// API route to allow book delete a book goes in here
router.delete('/api/books/:id', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, bookControllers.deleteBook);

exports.default = router;