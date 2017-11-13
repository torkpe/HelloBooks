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
            return false;
          }
          console.log(info);
          return true;
        });
      }
    });
  }
};
exports.default = sendEmail;