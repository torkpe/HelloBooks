import model from '../models';
import sendEmail from './email';

const Notifications = model.Notification;

export default {
  createNotification(req, res) {
    return Notifications
      .create({
        message: req.body.message,
        type: req.body.type, // Admin or User
        viewed: false,
        userId: req.body.userId,
        from: req.body.user,
      }).then(notification => res.status(200).send({ notification, message: 'successfully created notification' }),
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
        userId: req.params.id,
      },
    }).then((foundNotifications) => {
      if (foundNotifications) {
        return res.status(200).send(foundNotifications);
      }
      return res.status(200).send({ message: 'No notification at this time' });
    }).catch(err => res.status(400).send({ message: err.message }));
  },
};
