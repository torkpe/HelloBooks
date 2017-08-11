import model from '../models';

const Book = model.Book;
const borrowBook = model.BorrowBook;

export default {
  // find a book
  borrow(req, res) {
    return Book
      .findOne({
        // check if request book exists
        where: { id: req.params.bookId
        } })
      .then((book) => {
        if (!book || book.quantity < 1) {
          res.status(404).send({ message: 'Book not found' });
        } else {
          borrowBook.findOne({ where:
              // check whether book already has been borrowed by user
              { bookId: req.params.bookId,
                userId: req.decoded.userId,
                returned: false
              } }).then((foundBorrowed) => {
            if (!foundBorrowed) {
              borrowBook.create({
                bookId: req.params.bookId,
                userId: req.decoded.userId,
                returned: false
              }).then(borrowed => res.status(201).send(borrowed));
            } else {
              // return 204 not created
              res.status(400).send({ message: 'Return book first before borrowing again' });
            }
          });
        }
      });
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
          userId: req.decoded.userId,
        },
      }).then((books) => {
        res.status(201).send(books);
      });
  },
  // Return a book and update status
  returnBook(req, res) {
    return borrowBook
      .findOne({
        where: {
          userId: req.params.userId,
          bookId: req.params.bookId,
          returned: false,
        }
      }).then((book) => {
        if (!book) {
          return res.status(204).send({ message: 'No book found' });
        }
        book.update({ returned: true })
          .then((updated) => {
            res.status(200).send({ updated, message: 'updated successfully' });
          });
      });
  }
};

