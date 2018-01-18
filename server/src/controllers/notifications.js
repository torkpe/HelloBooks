import model from '../models';
import { sendEmail, roles } from '../utils/index';

const Notifications = model.Notification;
const User = model.Users;

export default {
  /**
   * @description Creates notifications
   * 
   * @param {string} message
   * @param {string} type
   * @param {number} userId
   * @param {bookId} bookId
   * 
   * @returns {void}
   */
  createNotification(message, type, userId, bookId) {
    return User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      Notifications
        .create({
          message: `${user.name}, ${message}`,
          type, // Admin or User
          isTreated: false,
          userId,
          from: user.name,
          bookId,
        }).then(
          notification => ({
            notification,
            message: 'successfully created notification'
          }),
          sendEmail(message, type, userId)
        )
        .catch(() => ({
          message: 'Something went wrong'
        }));
    })
      .catch(() => ({
        message: 'Something went wrong'
      }));
  },
  /**
   * @description Get notifications for admin
   * 
   * @param {object} request
   * @param {*} response
   * 
   * @returns {object} response
   */
  getAdminNotifications(request, response) {
    return Notifications.findAll({
      where: {
        type: roles.admin,
      }
    }).then((foundNotifications) => {
      if (foundNotifications) {
        return response.status(200).send(foundNotifications);
      }
      return response.status(200).send({
        message: 'No notification at this time'
      });
    }).catch(() => response.status(500).send({
      message: 'Something went wrong'
    }));
  },
  /**
   * @description Get notifications for user
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
  getUserNotifications(request, response) {
    return Notifications.findAll({
      where: {
        userId: request.decoded.id,
        type: roles.user
      },
    }).then((foundNotifications) => {
      if (foundNotifications) {
        return response.status(200).send(foundNotifications);
      }
      return response.status(200).send({
        message: 'No notification at this time'
      });
    }).catch(() => response.status(500).send({
      message: 'Something went wrong'
    }));
  },
};
