'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorize = function authorize(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];

  if (token) {
    _jsonwebtoken2.default.verify(token, _server2.default.get('secret'), function (err, decoded) {
      if (err) {
        // console.error('JWT Verification Error', err);
        res.status(403).send(err);
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    res.status(403).send('Token not provided');
  }
};
exports.default = authorize;