'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookInfo = _models2.default.BookInfo;
exports.default = {
  create: function create(req, res) {
    return BookInfo.create({
      name: req.body.name,
      email: req.body.email,
      password: (0, _md2.default)(req.body.password)
    }).then(function (newUser) {
      return res.status(201).send(newUser);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};