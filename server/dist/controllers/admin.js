'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.Users;
var salt = _bcrypt2.default.genSaltSync(10); // Generate salt for password
// Generate Token
var generateToken = function generateToken(user) {
  return _jsonwebtoken2.default.sign({ user: user.id, star: user.star, category: user.isAdmin }, _server2.default.get('secret'), { expiresIn: 24 * 60 * 60 });
};

exports.default = {
  // sign up user
  create: function create(req, res) {
    return User.findAll({
      where: { isAdmin: true }
    }).then(function (admin) {
      if (admin.length < 100) {
        if (req.body.password1 !== req.body.password2) {
          return res.status(400).send({ Password: 'Passwords do not match' });
        }
        if (_validator2.default.isEmail(req.body.email)) {
          var hash = _bcrypt2.default.hashSync(req.body.password, salt);
          User.create({
            email: req.body.email,
            password: hash,
            isAdmin: true,
            star: 'admin',
            confirmed: true,
            key: 'admin'
          }).then(function (newUser) {
            var myToken = generateToken(newUser);
            res.status(201).send({ myToken: myToken, newUser: newUser });
          }).catch(function (error) {
            return res.status(400).send({ response: error.message });
          });
        } else {
          return res.status(400).send({ Email: 'Input must be an email' });
        }
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
      where: { email: req.body.email,
        isAdmin: true
      } }).then(function (admin) {
      if (!admin) {
        return res.status(404).send({ message: 'Admin not found' });
      }
      if (!_bcrypt2.default.compareSync(req.body.password, admin.password)) {
        return res.status(406).send({ message: !_bcrypt2.default.compareSync(req.body.password, admin.password) });
      }
      var myToken = generateToken(admin);
      res.status(200).send({
        myToken: myToken,
        userId: admin.id,
        email: admin.email
      });
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