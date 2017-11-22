import model from '../models';
import { determineDate } from '../utils/index';
import notification from './notifications';

const notify = notification.createNotification;
const { updateNotification } = notification;
const { Book } = model;
const { BorrowBook } = model;
export default {
  // Find a book
  borrow(request, response) {
    return Book
      .findOne({
        // Check if request book exists
        where: {
          id: request.params.bookId,
          deleted: false
        }
      })
      .then((book) => {
        if (!book || book.quantity < 1) {
          return response.status(404).send({ message: 'Book not available' });
        }
        BorrowBook.findOne({
          where:
              // Check whether book already has been borrowed by user
              {
                bookId: request.params.bookId,
                userId: request.decoded.user,
                returned: false,
              }
        }).then((foundBorrowed) => {
          if (!foundBorrowed) {
            BorrowBook.create({
              bookId: request.params.bookId,
              userId: request.decoded.user,
              returned: false,
              returnDate: determineDate(request.decoded.star),
              owing: false,
            }).then(
              borrowed => response.status(201).send({ borrowed }),
              // Remove from the quantity of books
              Book.find({
                where: { id: request.params.bookId },
              }).then((foundBook) => {
                foundBook.update({
                  quantity: foundBook.quantity - 1,
                });
              }).then(() => {
                const userId = request.decoded.user;
                const type = 'admin';
                const message = `just borrowed the book '${book.title}'`;
                const bookId = book.id;
                notify(message, type, userId, bookId);
              })
                .catch(() => response.status(500).send({
                  message: 'Something went wrong'
                }))
            );
          } else {
            // Return 400 not created
            response.status(400).send({ message: 'Return book first before borrowing again' });
          }
        });
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // Get borrowed books
  getBorrowedBooks(request, response) {
    return BorrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returned: false,
          userId: request.decoded.user,
        },
      }).then((books) => {
        if (books.length < 1) {
          return response.status(404).send({ message: 'You have no book pending to be returned' });
        }
        return response.status(200).send(books);
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  getAllBorrowedBooks(request, response) {
    return BorrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returned: true,
          userId: request.decoded.user,
        },
      }).then((books) => {
        if (books.length < 1) {
          return response.status(404).send({
            message: 'You have not borrowed any book at this time'
          });
        }
        return response.status(200).send(books);
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // Check if book has been borrowed before
  getABorrowed(request, response) {
    return BorrowBook
      .findOne({
        where: {
          bookId: request.params.id,
          returned: false,
          userId: request.params.userId,
        },
      }).then((book) => {
        if (!book) {
          return response.status(404).send({ message: 'No book found' });
        }
        return response.status(200).send(book);
      })
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // Return a book and update status
  returnBook(request, response) {
    return BorrowBook
      .findOne({
        where: {
          userId: request.decoded.user,
          bookId: request.params.bookId,
          returned: false,
        },
      }).then((book) => {
        if (!book) {
          return response.status(404).send({ message: 'No book found' });
        }
        book.update({ returned: true })
          .then((updated) => {
            response.status(201).send({ updated });
            Book.find({
              where: { id: request.params.bookId },
            }).then((foundBook) => {
              foundBook.update({
                quantity: foundBook.quantity + 1,
              }).then(() => {
                const userId = request.decoded.user;
                const type = 'admin';
                const message = `just returned the book '${foundBook.title}'`;
                const bookId = foundBook.id;
                notify(message, type, userId, bookId);
              });
            })
              .catch(() => response.status(500).send({ message: 'Something went wrong' }));
          })
          .catch(() => response.status(500).send({ message: 'Something went wrong' }));
      });
  },
  // Show all books that has exceeded deadline
  exceedDeadline(request, response) {
    const newDate = new Date(new Date().getTime());
    return BorrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returnDate: { $lt: newDate },
          returned: false,
          owing: false
        },
      }).then(books => response.status(200).send(books))
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // remind for exceeding deadline
  remindUser(request, response) {
    const { userId, bookId } = request.params;
    return BorrowBook
      .findOne({
        where: {
          userId,
          bookId,
        },
      }).then((book) => {
        if (book.length < 1) {
          return response.status(200).send({
            message: 'No detail concerning this book was found'
          });
        }
        Book.find({
          where: {
            id: bookId
          }
        }).then((foundBook) => {
          const type = 'user';
          const message = `Gentle reminder concerning the book '${foundBook.title}'.
          Please return as you have exceeded the deadline in order to continue using this service`;
          notify(message, type, userId, bookId);
          response.status(200).send({
            message: 'Successfully sent a notification to user',
          });
        });
      })
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
};
