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
      }).catch(function () {
        return res.status(400).send({ message: 'Something went wrong' });
      });
    }
    return res.status(406).send({ message: 'Invalid email' });
  },

  // Sign user in
  signin: function signin(req, res) {
    var _req$body = req.body,
        password = _req$body.password,
        email = _req$body.email;

    if (_validator2.default.isEmail(email)) {
      if (!password) {
        return res.status(400).send({ message: 'Password field is required' });
      }
      return User.findOne({
        where: { email: email // Check if user exists first
        } }).then(function (user) {
        if (!user) {
          return res.status(404).send({ message: 'Looks like you have not registered this account with us' });
        }
        // Check if passwords do not match
        if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
          return res.status(406).send({ message: 'Incorrect credentials' });
        }
        var myToken = generateToken(user);
        return res.status(200).send({ myToken: myToken, user: user });
      }).catch(function () {
        return res.status(400).send({ message: 'something went wrong' });
      });
    }
    return res.status(400).send({ message: 'invalid email' });
  },

  // Update user after email confirmation
  updateUser: function updateUser(req, res) {
    var _req$body2 = req.body,
        name = _req$body2.name,
        password1 = _req$body2.password1,
        password2 = _req$body2.password2;
    // A little validation

    if (name && password1 && password2) {
      if (name.length > 3) {
        if (password1.length < 5) {
          return res.status(400).send({ message: 'password is too short' });
        }
        if (!_validator2.default.equals(password1, password2)) {
          return res.status(400).send({ message: 'Passwords do not match' });
        }
        var hash = _bcrypt2.default.hashSync(req.body.password1, salt);
        return User.findOne({
          where: { key: req.params.key // Check if user exists first
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
      return res.status(400).send({ message: 'Name is too short' });
    }
    return res.status(400).send({ message: 'All fields are required' });
  },
  setPassword: function setPassword(req, res) {
    var _req$body3 = req.body,
        password1 = _req$body3.password1,
        password2 = _req$body3.password2;
    // validate

    if (password1 && password2) {
      if (password2.length > 5 && password1.length > 5) {
        if (_validator2.default.equals(password1, password2)) {
          var hash = _bcrypt2.default.hashSync(req.body.password1, salt);
          return User.find({
            where: {
              id: req.params.id
            }
          }).then(function (user) {
            if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
              return res.status(406).send({ message: 'Incorrect Password' });
            }
            user.update({
              password: hash
            }).then(function (updated) {
              return res.status(200).send({ user: updated });
            }).catch(function (err) {
              return res.status(200).send({ message: err.message });
            });
          }).catch(function (err) {
            return res.status(500).send({ message: err.message });
          });
        }
        return res.status(400).send({ message: 'Passwords do not match' });
      }
      return res.status(400).send({ message: 'Password is too short' });
    }
    return res.status(400).send({ message: 'Password field missing' });
  },
  updateName: function updateName(req, res) {
    var name = req.body.name;

    if (name && name.length > 4) {
      return User.find({
        where: {
          id: req.params.id
        }
      }).then(function (user) {
        user.update({
          name: req.body.name
        }).then(function (updated) {
          return res.status(200).send(updated);
        }).catch(function (err) {
          return res.status(500).send({ message: err.message });
        });
      }).catch(function (err) {
        return res.status(500).send({ message: err.message });
      });
    }
  },
  getUser: function getUser(req, res) {
    return User.find({
      where: {
        id: req.params.id
      }
    }).then(function (user) {
      return res.status(200).send(user);
    }).then(function (err) {
      return res.status(400).send({ message: err.message });
    });
  }
};