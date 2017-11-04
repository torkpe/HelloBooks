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

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

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
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _cors2.default)());
_passport2.default.serializeUser(function (user, cb) {
  cb(null, user);
});

_passport2.default.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Require express routes from route
var userRoute = _index2.default.user;
var bookRoute = _index2.default.book;
var adminRoute = _index2.default.admin;
var landingRoute = _index2.default.landing;
var notificationsRoute = _index2.default.notifications;
var googleRoute = _index2.default.google;

// Use route for users
app.use('/api/v1/', userRoute);
// Use route for books
app.use('/api/v1/', bookRoute);
// Use route for admin
app.use('/api/v1/', adminRoute);
// Landing route
app.use('/api/v1/', landingRoute);
// Notifications route
app.use('/api/v1/', notificationsRoute);
// Google route
app.use('/api/v1/', googleRoute);
app.route('*').post(function (req, res) {
  res.status(404).send({ message: 'This page does not exist' });
}).get(function (req, res) {
  res.status(404).send({ message: 'This page does not exist' });
});
exports.default = app;