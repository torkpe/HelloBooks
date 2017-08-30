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

var notifications = _controllers2.default.notification;
var router = _express2.default.Router();
// Send notification to user for charges
router.post('/api/v1/notifications', _middleware2.default.checkAuthentication, notifications.createNotification);
// Get notification for user
router.get('/api/v1/notifications/user', _middleware2.default.checkAuthentication, _middleware2.default.authorizeUser, notifications.getUserNotifications);
// Get notification for admin
router.get('/api/v1/notifications/admin', _middleware2.default.checkAuthentication, _middleware2.default.authorizeAdmin, notifications.getAdminNotifications);

exports.default = router;