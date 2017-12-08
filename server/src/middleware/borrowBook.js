import model from '../models';
import { categories } from '../utils/index';


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
  const { id, star } = request.decoded;
  findBorrows(id).then((foundBorrowedBooks) => {
    const countBorrowed = foundBorrowedBooks.length;
    if (String(star) === categories.bronze && countBorrowed >= 1) {
      return response.status(401).send({
        message: 'Sorry!!! This action cannot be completed due to your current star level'
      });
    }
    if (String(star) === categories.silver && countBorrowed >= 2) {
      return response.status(401).send({
        message: 'Sorry!!! This action cannot be completed due to your current star level'
      });
    }
    if (String(star) === categories.gold && countBorrowed >= 3) {
      return response.status(401).send({
        message: 'Sorry!!! This action cannot be completed due to your current star level'
      });
    }
    return next();
  });
};
// Check if user is owing before borrowing
const checkForExceededDeadline = (request, response, next) => {
  const newDate = new Date(new Date().getTime());
  borrowBook.findAll({
    where: {
      returnDate: { $lt: newDate },
      returned: false,
      userId: request.decoded.id
    },
  }).then((foundExceed) => {
    if (foundExceed.length > 0) {
      return response.status(401).send({
        message: 'Apparently you have book(s) that are due for return. Please return and try to borrow again'
      });
    }
    return next();
  });
};

export default {
  checkStar, checkForExceededDeadline
};
