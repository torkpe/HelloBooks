'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notifications = _models2.default.Notification;

exports.default = {
  createNotification: function createNotification(req, res) {
    return Notifications.create({
      message: req.body.message,
      type: req.body.type, // Admin or User
      viewed: false,
      userId: req.body.userId,
      from: req.body.user
    }).then(function (notification) {
      return res.status(200).send({ notification: notification, message: 'successfully created notification' });
    }, (0, _email2.default)(req.body.message, req.body.type, req.body.userId)).catch(function (err) {
      return res.status(403).send({ message: err.message });
    });
  },
  getAdminNotifications: function getAdminNotifications(req, res) {
    return Notifications.findAll({
      where: {
        type: 'admin'
      }
    }).then(function (foundNotifications) {
      if (foundNotifications) {
        return res.status(200).send(foundNotifications);
      }
      return res.status(200).send({ message: 'No notification at this time' });
    }).catch(function (err) {
      return res.status(400).send({ message: err.message });
    });
  },
  getUserNotifications: function getUserNotifications(req, res) {
    return Notifications.findAll({
      where: {
        type: 'user',
        userId: req.decoded.userId
      }
    }).then(function (foundNotifications) {
      if (foundNotifications) {
        return res.status(200).send(foundNotifications);
      }
      return res.status(200).send({ message: 'No notification at this time' });
    }).catch(function (err) {
      return res.status(400).send({ message: err.message });
    });
  }
};