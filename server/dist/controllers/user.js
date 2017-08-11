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

var salt = _bcrypt2.default.genSaltSync(10);
var User = _models2.default.Users;
exports.default = {
  create: function create(req, res) {
    var hash = _bcrypt2.default.hashSync(req.body.password, salt);
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      isAdmin: false
    }).then(function () {
      return res.status(200).send({ response: 'Successfully created', err: '======================' });
    }).catch(function (error) {
      return res.status(400).send({ response: error.message });
    });
  },

  // Sign user in
  findUser: function findUser(req, res) {
    return User.findOne({
      where: { name: req.body.name
      } }).then(function (user) {
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Check if passwords do not match
      if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
        return res.status(406).send({ message: 'Incorrect Password' });
      }
      var myToken = _jsonwebtoken2.default.sign({ user: user.id, category: user.isAdmin }, _server2.default.get('secret'), { expiresIn: 24 * 60 * 60 });
      return res.status(200).send({ token: myToken, userId: user.id, category: user.isAdmin });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};