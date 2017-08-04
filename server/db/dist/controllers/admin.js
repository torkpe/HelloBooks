'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = _models2.default.Admin;

exports.default = {
  create: function create(req, res) {
    return Admin.create({
      username: req.body.username,
      password: (0, _md2.default)(req.body.password)
    }).then(function (newUser) {
      return res.status(201).send(newUser);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  findAdmin: function findAdmin(req, res) {
    return Admin.findOne({
      where: { username: req.body.username,
        password: (0, _md2.default)(req.body.password)
      } }).then(function (user) {
      if (!user) {
        res.send('User not found');
      } else {
        var myToken = _jsonwebtoken2.default.sign({ user: user.id }, 'secret', { expiresIn: 24 * 60 * 60 });
        res.send(200, { token: myToken,
          userId: user.id,
          name: user.username });
      }
    });
  }
};