import model from '../models';
import { categories } from '../utils/index';


const borrowBook = model.BorrowBook;
/**
 * @description Determine number of times user is allowed to borrow book
 * 
 * @param {number} id
 * 
 * @returns {object} array of borrowed books
 */
const findBorrows = id => borrowBook.findAll({
  where: {
    userId: id,
    returned: false
  }
}).then(foundBorrowed => foundBorrowed.map(borrowedBook => borrowedBook.dataValues));

/**
 * @description Permit user to borrow based on user's level
 * 
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * 
 * @return {object} response
 * @return {function} next
 */
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

/**
 * @description Check if user is owing before borrowing
 * 
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * 
 * @return {object} response
 * @return {function} next
 */
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
