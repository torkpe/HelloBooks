import nodemailer from 'nodemailer';
import model from '../models';

const User = model.Users;

const dotenv = require('dotenv');

dotenv.config();

/**
 * @description Function to send email to users
 * 
 * @param {string} message
 * @param {string} type
 * @param {number} userId
 * 
 * @return {void}
 */
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
            return (false);
          }
          return (true);
        });
      }
    });
  }
};
export default sendEmail;
