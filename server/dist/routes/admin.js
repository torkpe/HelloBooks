'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _middleware = require('../middleware/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var borrowBookControllers = _controllers2.default.borrowBook;

var adminControllers = _controllers2.default.admin;
var router = _express2.default.Router();
router.post('/api/v1/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/v1/admin/signin', adminControllers.findAdmin);
router.get('/api/v1/admins', adminControllers.findAdmins);
router.get('/api/v1/admins/exceed-deadlines', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, borrowBookControllers.exceedDeadline);

exports.default = router;