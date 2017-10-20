'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _randomKey = require('random-key');

var _randomKey2 = _interopRequireDefault(_randomKey);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var salt = _bcrypt2.default.genSaltSync(10);
var User = _models2.default.Users;
// Function to generate token for user
var generateToken = function generateToken(user) {
  return _jsonwebtoken2.default.sign({
    user: user.id,
    name: user.name,
    star: user.star,
    category: user.isAdmin
  }, _server2.default.get('secret'), { expiresIn: 24 * 60 * 60 });
};

exports.default = {
  create: function create(req, res) {
    if (_validator2.default.isEmail(req.body.email)) {
      return User.create({ // Create a new user
        email: req.body.email,
        isAdmin: false,
        star: 'bronze',
        confirmed: false,
        key: _randomKey2.default.generate(50)
      }).then(function (user) {
        var link = 'http://localhost:3000/confirmation/' + user.key;
        var message = '\nHello there, thank you for registering for helloBooks.\nPlease click on the click below to confirm your email address\n                         ' + link;
        (0, _email2.default)(message, 'user', user.id);
        return res.status(201).send({ user: user, message: 'A mail has been sent to your email' });
      }).catch(function (error) {
        return res.status(400).send({ message: error.message });
      });
    }
    return res.status(406).send({ message: 'Invalid email' });
  },

  // Sign user in
  findUser: function findUser(req, res) {
    return User.findOne({
      where: { email: req.body.email // Check if user exists first
      } }).then(function (user) {
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Check if passwords do not match
      if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
        return res.status(406).send({ message: 'Incorrect Password' });
      }
      var myToken = generateToken(user);
      return res.status(200).send({ myToken: myToken, user: user });
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },

  // Update user after email confirmation
  updateUser: function updateUser(req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        password1 = _req$body.password1,
        password2 = _req$body.password2;
    // A little validation

    if (name && password1 && password2) {
      if (name.length > 3 && password1.length > 5 && password2.length > 5 && _validator2.default.equals(password1, password2)) {
        var hash = _bcrypt2.default.hashSync(req.body.password1, salt);
        return User.findOne({
          where: { key: '' + req.params.key // Check if user exists first
          } }).then(function (user) {
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          // Update user info
          user.update({
            name: req.body.name,
            password: hash
          }).then(function (updatedUser) {
            var myToken = generateToken(updatedUser); // Generate token for user
            return res.status(200).send({ myToken: myToken, updatedUser: updatedUser });
          }).catch(function (error) {
            return res.status(400).send(error.message);
          });
          return user;
        }).catch(function (error) {
          return res.status(400).send(error.message);
        });
      }
      return res.status(400).send({ message: 'Invalid input' });
    }
    return res.status(400).send({ message: 'All fields are required' });
  }
};