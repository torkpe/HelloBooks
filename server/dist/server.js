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

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var logger = _morgan2.default;
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));
app.use(logger('dev'));
app.set('secret', 'ghjkcndschyu$%^&*gdshcndsyucbds%^&hc5%^784678wqfewtyy');
// Require express routes from route
var userRoute = _index2.default.user,
    bookRoute = _index2.default.book,
    adminRoute = _index2.default.admin,
    landingRoute = _index2.default.landing;

// Use route for users
app.use(userRoute);
// Use route for books
app.use(bookRoute);
// Use route for admin
app.use(adminRoute);
// Landing route
app.use(landingRoute);
app.route('*').post(function (req, res) {
  res.status(404).send({ message: 'This page does not exist' });
}).get(function (req, res) {
  res.status(404).send({ message: 'This page does not exist' });
});
exports.default = app;