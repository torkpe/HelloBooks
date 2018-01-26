import model from '../models';
import notification from '../controllers/notifications';
import categories from './categories';

const { createNotification } = notification;
const { Book, BorrowBook, Users } = model;

// Upgrade user and create notification

const upgradeUser = () => {
  Users.findAll({})
    .then((users) => {
      if (!users) {
        return null;
      }
      users.map((user) => {
        const { id } = user;
        BorrowBook.findAll({
          where: {
            userId: id,
            returned: true
          }
        }).then((details) => {
          if (user.star === categories.gold) {
            return null;
          }
          if (details.length >= 3) {
            if (user.star === categories.bronze) {
              user.update({
                star: categories.silver
              }).then((upgradedUser) => {
                const message = `Congratulations! You have just been upgraded to ${upgradedUser.star} level`;
                createNotification(message, 'user', id);
                return ({
                  message: 'successfully upgraded user'
                });
              })
                .catch(() => ({ message: 'Something went wrong' }));
            }
          }
          if (details.length >= 5) {
            if (user.star === categories.silver) {
              user.update({
                star: categories.gold
              }).then((upgradedUser) => {
                const message = `Congratulations! You have just been upgraded to ${upgradedUser.star} level`;
                createNotification(message, 'user', id);
                return ({
                  message: 'successfully upgraded user'
                });
              })
                .catch(() => ({ message: 'Something went wrong' }));
            }
          }
        })
          .catch(() => ({ message: 'Something went wrong' }));
        return null;
      });
    });
};

export default upgradeUser;