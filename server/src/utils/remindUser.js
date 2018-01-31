import model from '../models';
import notification from '../controllers/notifications';

const { createNotification } = notification;
const { Book, BorrowBook } = model;

// Get all users exceeding deadline and send notification to them

export const getExceededDeadlineAndRemind = () => {
  const newDate = new Date(new Date().getTime());
  return BorrowBook
    .findAll({
      where: {
        returnDate: { $lt: newDate },
        returned: false,
        owing: false
      },
    }).then((books) => {
      if (books.length > 0) {
        return books.map((book) => {
          const { userId, bookId } = book;
          Book.find({
            where: {
              id: bookId
            }
          }).then((foundBook) => {
            const type = 'user';
            const message = `You have exceeded deadline\
             for the book '${foundBook.title}'. Please Return.`;
            createNotification(message, type, userId, bookId);
          })
            .catch(() => ({ message: 'something is wrong' }));
          book.update({
            owing: true
          })
            .catch(() => ({ message: 'Something went wrong' }));
          return null;
        });
      }
      return null;
    })
    .catch(() => ({
      message: 'Something went wrong here'
    }));
};
