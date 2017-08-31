'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _landing = require('./landing');

var _landing2 = _interopRequireDefault(_landing);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  user: _user2.default, book: _book2.default, admin: _admin2.default, landing: _landing2.default, notifications: _notifications2.default, google: _google2.default
};