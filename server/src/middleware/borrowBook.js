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
const checkStar = (req, res, next) => {
  const user = req.decoded.user;
  const star = req.decoded.star;
  findBorrows(user).then((foundBorrowedBooks) => {
    let statusMessage = true;
    if (star === 'bronze') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed === 1) {
        statusMessage = false;
      }
      return statusMessage;
    } else if (star === 'silver') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed === 2) {
        statusMessage = false;
      }
      return statusMessage;
    } else if (star === 'gold') {
      const countBorrowed = foundBorrowedBooks.length;
      if (countBorrowed === 3) {
        statusMessage = false;
      }
      return statusMessage;
    }
  }).then((result) => {
    if (result === true) {
      return next();
    }
    if (result === false) {
      return res.status(400).send({ message: 'Sorry!!! This action cannot be completed due to your current star level' });
    }
    return res.status(500).send({ message: 'Something went wrong' });
  });
};
// Check if user is owing before borrowing
const checkDebt = (req, res, next) => {
  borrowBook.findAll({
    where: {
      userId: req.decoded.user,
      owing: true
    }
  }).then((foundDebt) => {
    const debt = foundDebt;
    if (debt.length > 0) {
      return res.status(403).send({ message: 'Please pay your debt before borrowing' });
    }
    return next();
  });
};

export default {
  checkStar, checkDebt
};
