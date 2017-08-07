import model from '../models';

const Book = model.Book;
const borrowBook = model.BorrowBook;

export default {
  // find a book
  borrowBook(req, res) {
    return Book
      .findOne({
        // check if request book exists
        where: { id: req.params.bookId
        } })
      .then((book) => {
        if (!book) {
          res.status(404).send({ message: 'Book not found' });
        } else {
          borrowBook.findOne({ where:
              // check whether book already has been borrowed by user
              { bookId: req.params.bookId,
                userId: req.params.userId,
                returned: false
              } }).then((foundBorrowed) => {
            if (!foundBorrowed) {
              borrowBook.create({
                bookId: req.params.bookId,
                userId: req.params.userId,
                returned: false
              }).then(borrowed => res.status(201).send(borrowed));
            } else {
              // return 204 not created
              res.status(202).send({ message: 'Return book first before borrowing again' });
            }
          });
        }
      });
  },
  getBorrowedBooks(req, res) {
    return borrowBook
      .findAll({
        include: [
          Book,
        ],
        where: {
          returned: false,
          userId: req.params.userId,
        },
      }).then((books) => {
        res.status(201).send(books);
      });
  }
};
