import model from '../models';

const borrowBook = model.BorrowBook;
// Function to determine number of times user is allowed to borrow book
const findBorrows = id => borrowBook.findAll({
  where: {
    userId: id,
    returned: false
  }
}).then(foundBorrowed => foundBorrowed.map(borrowedBook => borrowedBook.dataValues));
// Permit user to borrow based on user's level
const checkStar = (request, response, next) => {
  const { user } = request.decoded;
  const { star } = request.decoded;
  findBorrows(user).then((foundBorrowedBooks) => {
    let isQualified = true;
    if (star === 'bronze') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed >= 1) {
        isQualified = false;
      }
      return isQualified;
    } else if (star === 'silver') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed >= 2) {
        isQualified = false;
      }
      return isQualified;
    } else if (star === 'gold') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed >= 3) {
        isQualified = false;
      }
      return isQualified;
    }
  }).then((result) => {
    if (result === true) {
      return next();
    }
    if (result === false) {
      return response.status(400).send({
        message: 'Sorry!!! This action cannot be completed due to your current star level'
      });
    }
    return response.status(500).send({ message: 'Something went wrong' });
  });
};
// Check if user is owing before borrowing
const checkForExceededDeadline = (request, response, next) => {
  const newDate = new Date(new Date().getTime());
  borrowBook.findAll({
    where: {
      returnDate: { $lt: newDate },
      returned: false,
    },
  }).then((foundExceed) => {
    if (foundExceed.length > 0) {
      return response.status(403).send({
        message: 'Apparently you have book(s) that are due for return. Please return and try to borrow again'
      });
    }
    return next();
  });
};

export default {
  checkStar, checkForExceededDeadline
};
