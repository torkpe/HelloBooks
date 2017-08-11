'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminControllers = _controllers2.default.admin;
var router = _express2.default.Router();
//  signin admin
router.post('/api/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/admin/signin', adminControllers.findAdmin);
router.get('/api/admins', adminControllers.findAdmins);
exports.default = router;