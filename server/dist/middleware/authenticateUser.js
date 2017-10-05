'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book;
var borrowBook = _models2.default.BorrowBook;
var User = _models2.default.User;

// Function to determine number of times user is allowed to borrow book
var findBorrows = function findBorrows(id, userStar) {
  borrowBook.findAll({
    where: {
      userId: id,
      returned: false
    }
  }).then(function (foundBorrowed) {
    var borrowed = foundBorrowed;
    return borrowed;
  });
};
var permitBorrow = function permitBorrow(id, userStar) {
  var foundBorrows = void 0;
  var statusMessage = void 0;
  if (userStar === 'bronze') {
    foundBorrows = findBorrows(id, userStar);
    if (foundBorrows && foundBorrows === 1) {
      statusMessage = false;
    } else {
      statusMessage = true;
    }
    return statusMessage;
  } else if (userStar === 'silver') {
    foundBorrows = findBorrows(id, userStar);
    if (foundBorrows && foundBorrows === 2) {
      statusMessage = false;
    } else {
      statusMessage = true;
    }
    return statusMessage;
  } else if (userStar === 'gold') {
    foundBorrows = findBorrows(id, userStar);
    if (foundBorrows && foundBorrows === 3) {
      statusMessage = false;
    } else {
      statusMessage = true;
    }
    return statusMessage;
  }
  statusMessage = 'bad';
  return statusMessage;
};
var checkStar = function checkStar(req, res, next) {
  var user = req.decoded.user;
  var star = req.decoded.star;
  var result = permitBorrow(user, star);
  if (result === true) {
    return next();
  }
  if (result === false) {
    return res.status(400).send({ message: 'Sorry!!! This action cannot be completed due to your current star level' });
  }
  return res.status(500).send({ message: 'Something went wrong' });
};

exports.default = checkStar;