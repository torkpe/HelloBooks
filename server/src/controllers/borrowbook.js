import model from '../models';

const Book = model.Book;
const borrowBook = model.BorrowBook;
// Function to determine return date for each user
const determineDate = (star) => {
  let newDate;
  if (star === 'bronze') {
    newDate = new Date(new Date().getTime() + (1 * 60 * 1000));
    return newDate;
  }
  if (star === 'silver') {
    newDate = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000));
    return newDate;
  }
  if (star === 'gold') {
    newDate = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));
    return newDate;
  }
};

export default {
  // Find a book
  borrow(req, res) {
    return Book
      .findOne({
        // Check if request book exists
        where: { id: req.params.bookId,
        } })
      .then((book) => {
        if (!book || book.quantity < 1) {
          return res.status(404).send({ message: 'Book not available' });
        }
        borrowBook.findOne({ where:
              // Check whether book already has been borrowed by user
              { bookId: req.params.bookId,
                userId: req.decoded.user,
                returned: false,
              } }).then((foundBorrowed) => {
          if (!foundBorrowed) {
            borrowBook.create({
              bookId: req.params.bookId,
              userId: req.decoded.user,
              returned: false,
              returnDate: determineDate(req.decoded.star),
              owing: false,
            }).then(borrowed => res.status(201).send({ borrowed })
              .catch(err => res.status(500).send({ message: err })),
              // Remove from the quantity of books
            Book.find({
              where: { id: req.params.bookId },
            }).then((foundBook) => {
              foundBook.update({
                quantity: foundBook.quantity - 1,
              });
            }),
            );
          } else {
            // Return 400 not created
            res.status(400).send({ message: 'Return book first before borrowing again' });
          }
        });
      }).catch(err => res.status(400).send({ message: err.message }));
  },
  // Get borrowed books
  getBorrowedBooks(req, res) {
    return borrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returned: false,
          userId: req.decoded.user,
        },
      }).then((books) => {
        if (books.length < 1) {
          return res.status(404).send({
            message: 'You have no book pending to be returned' });
        }
        return res.status(200).send(books);
      }).catch(err => res.status(400).send({ message: err.message }));
  },
  // Return a book and update status
  returnBook(req, res) {
    return borrowBook
      .findOne({
        where: {
          userId: req.decoded.user,
          bookId: req.params.bookId,
          returned: false,
        },
      }).then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'No book found' });
        }
        book.update({ returned: true,
        })
          .then((updated) => {
            res.status(201).send({ updated });
            Book.find({
              where: { id: req.params.bookId },
            }).then((foundBook) => {
              foundBook.update({
                quantity: foundBook.quantity + 1,
              });
            })
              .catch(err => res.status(500).send({ message: err.message }));
          })
          .catch(err => res.status(500).send({ message: err.message }));
      });
  },
  // Show all books that has exceeded deadline
  exceedDeadline(req, res) {
    const newDate = new Date(new Date().getTime());
    return borrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returnDate: { $gt: newDate },
          returned: false,
        },
      }).then(books => res.status(200).send(books))
        .catch(err => res.status(500).send(err))
  },
  // Charge for exceeding deadline
  chargeUser(req, res) {
    return borrowBook
      .findOne({
        where: {
          userId: req.params.userId,
          bookId: req.params.bookId,
        },
      }).then((books) => {
        console.log('updated')
        if (!books) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        books.update({
          owing: req.body.owing
        }).then(updated => res.status(200).send({
          updated,
          message: 'Successfully charged user',
        }))
          .catch(err => res.status(500).send({
            message: err.message
          }));
      })
      .catch(err => res.status(500).send({
        error: err.message,
        message: 'something went wrong'
      }));
  },
};
