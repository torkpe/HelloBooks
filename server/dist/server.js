'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//  show index page
app.get('/api', function (req, res) {
    res.send('<h1>hello landing page<h1>');
});
//  sign up user
app.post('/api/users/signup', function (req, res) {
    res.send('<h1>signup user<h1>');
});
//  signin user
app.post('/api/users/signin', function (req, res) {
    res.send('<h1>signin user<h1>');
});
// add new book
app.post('/api/books', function (req, res) {
    res.send('<h1>add new book<h1>');
});
//edit a book
app.put('/api/books/:id', function (req, res) {
    res.send('<h1>edit a book<h1>');
});
//delete a book
app.delete('/api/books/:id', function (req, res) {
    res.send('<h1>delete a book<h1>');
});
app.get('/api/books', function (req, res) {
    res.send('<h1>hello landing page<h1>');
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