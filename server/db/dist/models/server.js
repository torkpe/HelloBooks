'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var logger = _morgan2.default;
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(logger('dev'));
var userController = _controllers2.default.users;
var adminControllers = _controllers2.default.admin;
var bookControllers = _controllers2.default.book;
//  show index page
app.get('/api', function (req, res) {
    res.send('<h1>hello landing page<h1>');
});
//  sign up user
app.post('/api/users/signup', userController.create);
//  signin user
app.post('/api/users/signin', userController.findUser);
//  signin admin
app.post('/api/admin/signup', adminControllers.create);
//  signin admin
app.post('/api/admin/signin', adminControllers.findAdmin);
// add a book
app.post('/api/books', bookControllers.create);
// get all books
app.get('/api/books', bookControllers.findAll);
// get a books
app.get('/api/books/:id', bookControllers.findOne);
// edit a book
app.put('/api/books/:id', bookControllers.findBook);
// delete a book
app.delete('/api/books/:id', function (req, res) {
    res.send('<h1>delete a book<h1>');
});
app.get('/api/users/:id/books?returned=false', function (req, res) {
    res.send('<h1>hello landing page<h1>');
});
//  api route to allow user borrow book
app.post('/api/users/:id/books', function (req, res) {
    res.send('borrow book');
});
// api route to allow user return a book;
app.put('/api/users/:id/books', function (req, res) {
    res.send('return book');
});

//  start server
exports.default = app;