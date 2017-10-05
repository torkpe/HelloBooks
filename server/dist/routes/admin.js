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
router.post('/api/admin/signup', adminControllers.create);
//  signin admin
router.post('/api/admin/signin', adminControllers.findAdmin);
router.get('/api/admins', adminControllers.findAdmins);
// Get all users exceeding deadline
router.get('/api/admins/exceed-deadlines', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, borrowBookControllers.exceedDeadline);
//Charge user
router.put('/api/admins/charge-user/:userId/:bookId', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, borrowBookControllers.chargeUser);

exports.default = router;