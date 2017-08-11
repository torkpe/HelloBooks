'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book;
var borrowBook = _models2.default.BorrowBook;

exports.default = {
  // find a book
  borrow: function borrow(req, res) {
    return Book.findOne({
      // check if request book exists
      where: { id: req.params.bookId
      } }).then(function (book) {
      if (!book || book.quantity < 1) {
        res.status(404).send({ message: 'Book not found' });
      } else {
        borrowBook.findOne({ where:
          // check whether book already has been borrowed by user
          { bookId: req.params.bookId,
            userId: req.decoded.userId,
            returned: false
          } }).then(function (foundBorrowed) {
          if (!foundBorrowed) {
            borrowBook.create({
              bookId: req.params.bookId,
              userId: req.decoded.userId,
              returned: false
            }).then(function (borrowed) {
              return res.status(201).send(borrowed);
            });
          } else {
            // return 204 not created
            res.status(400).send({ message: 'Return book first before borrowing again' });
          }
        });
      }
    });
  },

  // Get borrowed books
  getBorrowedBooks: function getBorrowedBooks(req, res) {
    return borrowBook.findAll({
      include: [Book],
      where: {
        returned: false,
        userId: req.decoded.userId
      }
    }).then(function (books) {
      res.status(201).send(books);
    });
  },

  // Return a book and update status
  returnBook: function returnBook(req, res) {
    return borrowBook.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
        returned: false
      }
    }).then(function (book) {
      if (!book) {
        return res.status(204).send({ message: 'No book found' });
      }
      book.update({ returned: true }).then(function (updated) {
        res.status(200).send({ updated: updated, message: 'updated successfully' });
      });
    });
  }
};