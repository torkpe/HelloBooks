'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  checkAuthentication: function checkAuthentication(req, res, next) {
    var token = req.body.token || req.headers['x-access-token'];
    if (token) {
      _jsonwebtoken2.default.verify(token, _server2.default.get('secret'), function (err, decoded) {
        if (err) {
          res.status(403).send({ message: 'error here' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send('Token not provided');
    }
  },
  authorizeUser: function authorizeUser(req, res, next) {
    if (req.decoded.category === false) {
      next();
    } else {
      return res.status(403).send({ message: 'This page is for users only' });
    }
  },
  authorizeAdmin: function authorizeAdmin(req, res, next) {
    if (req.decoded.category === true) {
      next();
    } else {
      return res.status(403).send({ message: 'This page is for Admins only' });
    }
  }
};