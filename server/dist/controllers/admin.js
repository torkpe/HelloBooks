'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.Users;
var salt = _bcrypt2.default.genSaltSync(10); // Generate salt for password
exports.default = {
  // sign up user
  create: function create(req, res) {
    var hash = _bcrypt2.default.hashSync(req.body.password, salt);
    return User.findAll({
      where: { isAdmin: true }
    }).then(function (admin) {
      if (admin.length < 100) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin: true
        }).then(function (newUser) {
          return res.status(201).send(newUser);
        }).catch(function (error) {
          return res.status(400).send({ response: error.message });
        });
      } else {
        return res.status(400).send({ message: 'You have made a bad request' });
      }
    }).catch(function (error) {
      return res.status(400).send({ response: error.message });
    });
  },

  // sign in user
  findAdmin: function findAdmin(req, res) {
    return User.findOne({
      where: { name: req.body.name,
        isAdmin: true
      } }).then(function (admin) {
      if (!admin) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      if (!_bcrypt2.default.compareSync(req.body.password, admin.password)) {
        res.status(406).send({ message: 'Incorrect Password' });
      } else {
        var myToken = _jsonwebtoken2.default.sign({ user: admin.id, category: admin.isAdmin }, _server2.default.get('secret'), { expiresIn: 24 * 60 * 60 });
        res.status(200).send({
          token: myToken,
          userId: admin.id,
          name: admin.name
        });
      }
    }).catch(function (error) {
      return res.status(400).send({ response: error.message });
    });
  },
  findAdmins: function findAdmins(req, res) {
    return User.findAll({
      where: { isAdmin: true }
    }).then(function (admins) {
      return res.status(201).send(admins);
    });
  }
};