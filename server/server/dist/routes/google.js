'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dotenv = require('dotenv');

dotenv.config();
_controllers2.default.google();
var router = _express2.default.Router();
router.get('/auth/google', _passport2.default.authenticate('google', { scope: ['profile', 'email'] })); // Scope: what we are requesting from google api

router.get('/auth/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
  res.send('hello user');
});
exports.default = router;