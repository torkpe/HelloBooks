'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book;
var borrowBook = _models2.default.BorrowBook;
// Function to determine return date for each user
var determineDate = function determineDate(star) {
  var newDate = void 0;
  if (star === 'bronze') {
    newDate = new Date(new Date().getTime() + 1 * 60 * 1000);
    return newDate;
  }
  if (star === 'silver') {
    newDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    return newDate;
  }
  if (star === 'gold') {
    newDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    return newDate;
  }
};

exports.default = {
  // Find a book
  borrow: function borrow(req, res) {
    return Book.findOne({
      // Check if request book exists
      where: { id: req.params.bookId
      } }).then(function (book) {
      if (!book || book.quantity < 1) {
        return res.status(404).send({ message: 'Book not available' });
      }
      borrowBook.findOne({ where:
        // Check whether book already has been borrowed by user
        { bookId: req.params.bookId,
          userId: req.decoded.user,
          returned: false
        } }).then(function (foundBorrowed) {
        if (!foundBorrowed) {
          borrowBook.create({
            bookId: req.params.bookId,
            userId: req.decoded.user,
            returned: false,
            returnDate: determineDate(req.decoded.star),
            owing: false
          }).then(function (borrowed) {
            return res.status(201).send({ borrowed: borrowed }).catch(function (err) {
              return res.status(500).send({ message: err });
            });
          },
          // Remove from the quantity of books
          Book.find({
            where: { id: req.params.bookId }
          }).then(function (foundBook) {
            foundBook.update({
              quantity: foundBook.quantity - 1
            });
          }));
        } else {
          // Return 400 not created
          res.status(400).send({ message: 'Return book first before borrowing again' });
        }
      });
    }).catch(function (err) {
      return res.status(400).send({ message: err.message });
    });
  },

  // Get borrowed books
  getBorrowedBooks: function getBorrowedBooks(req, res) {
    return borrowBook.findAll({
      include: [Book],
      where: {
        returned: false,
        userId: req.decoded.user
      }
    }).then(function (books) {
      if (books.length < 1) {
        return res.status(404).send({
          message: 'You have no book pending to be returned' });
      }
      return res.status(200).send(books);
    }).catch(function (err) {
      return res.status(400).send({ message: err.message });
    });
  },
  getAllBorrowedBooks: function getAllBorrowedBooks(req, res) {
    return borrowBook.findAll({
      include: [Book],
      where: {
        returned: true,
        userId: req.decoded.user
      }
    }).then(function (books) {
      if (books.length < 1) {
        return res.status(404).send({
          message: 'You have not borrowed any book at this time'
        });
      }
      return res.status(200).send(books);
    }).catch(function (err) {
      return res.status(400).send({ message: err.message });
    });
  },

  // Pay back debts
  payBack: function payBack(req, res) {
    return borrowBook.findAll({
      where: {
        userId: req.params.id,
        bookId: req.params.id,
        owing: true
      }
    }).then(function (found) {
      if (found.length < 1) {
        return res.status(404).send({
          message: 'You have not borrowed this book'
        });
      }
      books.update({
        owing: false
      }).then(function (updated) {
        return res.status(200).send({
          message: 'successfully updated',
          updated: updated
        });
      }).catch(function (err) {
        return res.status(500).send({
          message: 'Something went wrong'
        });
      });
    }).catch(function (err) {
      return res.status.send({
        message: err.message
      });
    });
  },

  // Return a book and update status
  returnBook: function returnBook(req, res) {
    return borrowBook.findOne({
      where: {
        userId: req.decoded.user,
        bookId: req.params.bookId,
        returned: false
      }
    }).then(function (book) {
      if (!book) {
        return res.status(404).send({ message: 'No book found' });
      }
      book.update({ returned: true
      }).then(function (updated) {
        res.status(201).send({ updated: updated });
        Book.find({
          where: { id: req.params.bookId }
        }).then(function (foundBook) {
          foundBook.update({
            quantity: foundBook.quantity + 1
          });
        }).catch(function (err) {
          return res.status(500).send({ message: err.message });
        });
      }).catch(function (err) {
        return res.status(500).send({ message: err.message });
      });
    });
  },

  // Show all books that has exceeded deadline
  exceedDeadline: function exceedDeadline(req, res) {
    var newDate = new Date(new Date().getTime());
    return borrowBook.findAll({
      include: [Book],
      where: {
        returnDate: { $lt: newDate },
        returned: false
      }
    }).then(function (books) {
      return res.status(200).send(books);
    }).catch(function (err) {
      return res.status(500).send(err);
    });
  },

  // Charge for exceeding deadline
  chargeUser: function chargeUser(req, res) {
    return borrowBook.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId
      }
    }).then(function (books) {
      if (!books) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
      books.update({
        owing: true
      }).then(function (updated) {
        return res.status(200).send({
          updated: updated,
          message: 'Successfully charged user'
        });
      }).catch(function (err) {
        return res.status(500).send({
          message: err.message
        });
      });
    }).catch(function (err) {
      return res.status(500).send({
        error: err.message,
        message: 'something went wrong'
      });
    });
  }
};