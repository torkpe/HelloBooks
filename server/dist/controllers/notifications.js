'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.Users;
var Notifications = _models2.default.Notification;
var dotenv = require('dotenv');

dotenv.config();

// Function to send email to users
var sendEmail = function sendEmail(message, type, userId) {
  if (type === 'user') {
    User.findAll({
      where: {
        id: userId
      }
    }).then(function (foundUser) {
      var userEmail = foundUser.map(function (user) {
        return user.dataValues.email;
      });
      if (foundUser) {
        var transporter = _nodemailer2.default.createTransport({
          service: 'gmail',
          secure: true,
          port: 25,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        var mailOptions = {
          from: '"hello-books Admin" <hellobooks9@gmail.com>',
          to: userEmail,
          subject: 'Notification from hello-books',
          text: message
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    });
  }
};
exports.default = {
  createNotification: function createNotification(req, res) {
    return Notifications.create({
      message: req.body.message,
      type: req.body.type, // Admin or User
      viewed: false,
      userId: req.body.userId,
      from: req.decoded.user
    }).then(function (notification) {
      return res.status(201).send({ notification: notification, message: 'successfully created notification' });
    }, sendEmail(req.body.message, req.body.type, req.body.userId)).catch(function (err) {
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