'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _borrowbook = require('./borrowbook');

var _borrowbook2 = _interopRequireDefault(_borrowbook);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  users: _user2.default, admin: _admin2.default, book: _book2.default, borrowBook: _borrowbook2.default, notification: _notifications2.default
};