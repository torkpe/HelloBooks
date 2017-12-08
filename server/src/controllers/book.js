import model from '../models';

const { Book, BorrowBook } = model;
export default {
  create(request, response) {
    const {
      cover, pdf, title, author, description, quantity, genre
    } = request.body;
    return Book
      .create({
        cover,
        pdf,
        title,
        author,
        description,
        quantity,
        genre,
        deleted: false,
      })
      .then(newBook => response.status(201).send({
        newBook,
        message: 'Book successfully created'
      }))
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
  // find a book
  findABook(request, response) {
    return Book
      .findOne({
        where: {
          id: request.params.id,
          deleted: false
        }
      })
      .then((book) => {
        if (!book) {
          response.status(404).send({
            message: 'Book not found'
          });
        } else {
          response.status(200).send(book);
        }
      }).catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
  // show all books
  findAllBooks(request, response) {
    return Book
      .findAll({
        where: {
          deleted: false,
        }
      })
      .then((book) => {
        if (book.length < 1) {
          return response.status(200).send({
            message: 'No book found'
          });
        }
        response.status(200).send(book);
      }).catch(() => response.status(500).send({
        message: 'Something went wrong'
      }))
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
  deleteBook(request, response) {
    const { id } = request.params;
    return Book
      .findOne({
        where: {
          id,
        }
      }).then((book) => {
        if (!book) {
          return response.status(404).send({
            message: 'Book is not found'
          });
        }
        BorrowBook.findOne({
          where: {
            bookId: book.id,
            returned: false
          }
        }).then((foundBorrowedBook) => {
          if (foundBorrowedBook) {
            return response.status(401).send({
              message: 'This action cannot be completed until all users have returned borrowed books'
            });
          }
          book.update({
            deleted: true
          }).then(deletedBook => response.status(200).send({
            message: 'Book successfully deleted'
          }))
            .catch(error => response.status(500).send({
              message: error.message
            }));
        })
          .catch(error => response.status(500).send({
            message: error.message
          }));
      })
      .catch(error => response.status(500).send({
        message: error.message
      }));
  },
  // update a book's info
  editBook(request, response) {
    return Book
      .findOne({
        where: {
          id: request.params.id, // Check if user exists first
        }
      })
      .then((book) => {
        if (!book) {
          return response.status(404).send({
            message: 'Book not found'
          });
        }
        // Update user info
        book.update({
          cover: request.body.cover,
          pdf: request.body.pdf,
          title: request.body.title,
          author: request.body.author,
          description: request.body.description,
          quantity: request.body.quantity,
          genre: request.body.genre,
        }).then(updatedBook => response.status(200).send({
          updatedBook,
          message: 'Book updated successfully'
        }))
          .catch(() => response.status(500).send({
            message: 'Something went wrong'
          }));
      })
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  }
};
