import nodemailer from 'nodemailer';
import model from '../models';

const User = model.Users;
const Notifications = model.Notification;
const dotenv = require('dotenv');

dotenv.config();

// Function to send email to users
const sendEmail = (message, type, userId) => {
  if (type === 'user') {
    User.findAll({
      where: {
        id: userId,
      },
    }).then((foundUser) => {
      const userEmail = foundUser.map(user => user.dataValues.email);
      if (foundUser) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: true,
          port: 25,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        const mailOptions = {
          from: '"hello-books Admin" <hellobooks9@gmail.com>',
          to: userEmail,
          subject: 'Notification from hello-books',
          text: message,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
      }
    });
  }
};
export default {
  createNotification(req, res) {
    return Notifications
      .create({
        message: req.body.message,
        type: req.body.type, // Admin or User
        viewed: false,
        userId: req.body.userId,
        from: req.decoded.user
      }).then(notification => res.status(201).send({ notification, message: 'successfully created notification' }),
        sendEmail(req.body.message, req.body.type, req.body.userId))
      .catch(err => res.status(403).send({ message: err.message }));
  },
  getAdminNotifications(req, res) {
    return Notifications.findAll({
      where: {
        type: 'admin',
      }
    }).then((foundNotifications) => {
      if (foundNotifications) {
        return res.status(200).send(foundNotifications);
      }
      return res.status(200).send({ message: 'No notification at this time' });
    }).catch(err => res.status(400).send({ message: err.message }));
  },
  getUserNotifications(req, res) {
    return Notifications.findAll({
      where: {
        type: 'user',
        userId: req.decoded.userId,
      },
    }).then((foundNotifications) => {
      if (foundNotifications) {
        return res.status(200).send(foundNotifications);
      }
      return res.status(200).send({ message: 'No notification at this time' });
    }).catch(err => res.status(400).send({ message: err.message }));
  },
};
