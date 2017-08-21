'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var borrowBook = _models2.default.BorrowBook;
// Function to determine number of times user is allowed to borrow book
var findBorrows = function findBorrows(id) {
  return borrowBook.findAll({
    where: {
      userId: id,
      returned: false
    }
  }).then(function (foundBorrowed) {
    return foundBorrowed.map(function (borrowedBook) {
      return borrowedBook.dataValues;
    });
  });
};
// Permit user to borrow
var checkStar = function checkStar(req, res, next) {
  var user = req.decoded.user;
  var star = req.decoded.star;
  findBorrows(user).then(function (foundBorrowedBooks) {
    var statusMessage = true;
    if (star === 'bronze') {
      var countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed === 1) {
        statusMessage = false;
      }
      return statusMessage;
    } else if (star === 'silver') {
      var _countBorrowed = foundBorrowedBooks.length;
      if (_countBorrowed === 2) {
        statusMessage = false;
      }
      return statusMessage;
    } else if (star === 'gold') {
      var _countBorrowed2 = foundBorrowedBooks.length;
      if (_countBorrowed2 === 3) {
        statusMessage = false;
      }
      return statusMessage;
    }
  }).then(function (result) {
    if (result === true) {
      return next();
    }
    if (result === false) {
      return res.status(400).send({ message: 'Sorry!!! This action cannot be completed due to your current star level' });
    }
    return res.status(500).send({ message: 'Something went wrong' });
  });
};

exports.default = checkStar;