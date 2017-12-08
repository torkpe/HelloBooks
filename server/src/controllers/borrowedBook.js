import model from '../models';
import { determineDate, remindUser } from '../utils/index';
import notification from './notifications';


const notify = notification.createNotification;
const { updateNotification } = notification;
const { Book, BorrowBook } = model;
export default {
  // Find a book
  borrow(request, response) {
    const { id } = request.decoded;
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
          return response.status(404).send({
            message: 'Book not available'
          });
        }
        BorrowBook.findOne({
          where:
              // Check whether book already has been borrowed by user
              {
                bookId: request.params.bookId,
                userId: id,
                returned: false,
              }
        }).then((foundBorrowed) => {
          if (!foundBorrowed) {
            BorrowBook.create({
              bookId: request.params.bookId,
              userId: id,
              returned: false,
              returnDate: determineDate(request.decoded.star),
              owing: false,
            }).then(
              borrowed => response.status(201).send({
                borrowed,
                message: 'Book successfully borrowed'
              }),
              // Remove from the quantity of books
              Book.find({
                where: { id: request.params.bookId },
              }).then((foundBook) => {
                foundBook.update({
                  quantity: foundBook.quantity - 1,
                });
              }).then(() => {
                const userId = id;
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
            response.status(400).send({
              message: 'Return book first before borrowing again'
            });
          }
        });
      }).catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
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
          userId: request.decoded.id,
        },
      }).then((books) => {
        if (books.length < 1) {
          return response.status(200).send({
            message: 'You have no book pending to be returned'
          });
        }
        return response.status(200).send(books);
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  getHistory(request, response) {
    return BorrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returned: true,
          userId: request.decoded.id,
        },
      }).then((books) => {
        if (books.length < 1) {
          return response.status(200).send({
            message: 'You have not borrowed any book at this time'
          });
        }
        return response.status(200).send(books);
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // Check if book has been borrowed before
  getABorrowedBook(request, response) {
    return BorrowBook
      .findOne({
        where: {
          bookId: request.params.id,
          returned: false,
          userId: request.decoded.id,
        },
      }).then((book) => {
        if (!book) {
          return response.status(404).send({
            message: 'No book found'
          });
        }
        return response.status(200).send(book);
      })
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
  // Return a book and update status
  returnBook(request, response) {
    const { id } = request.decoded;
    return BorrowBook
      .findOne({
        where: {
          userId: id,
          bookId: request.params.bookId,
          returned: false,
        },
      }).then((book) => {
        if (!book) {
          return response.status(404).send({ message: 'No book found' });
        }
        book.update({ returned: true })
          .then((updated) => {
            response.status(200).send({ updated });
            Book.find({
              where: {
                id: request.params.bookId
              },
            }).then((foundBook) => {
              foundBook.update({
                quantity: foundBook.quantity + 1,
              }).then(() => {
                const userId = id;
                const type = 'admin';
                const message = `just returned the book '${foundBook.title}'`;
                const bookId = foundBook.id;
                notify(message, type, userId, bookId);
              });
            })
              .catch(() => response.status(500).send({
                message: 'Something went wrong'
              }));
          })
          .catch(() => response.status(500).send({
            message: 'Something went wrong'
          }));
      });
  },
  getExceededDeadlineAndRemind() {
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
          books.map((book) => {
            const bookId = book.id;
            return remindUser(book.userId, book.id)
          });
        }
      })
      .catch(() => ({
        message: 'Something went wrong'
      }));
  },
};
