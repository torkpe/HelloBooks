import model from '../models';

const { Book, BorrowBook, BookGenre } = model;
export default {
  /**
   * @description Create a new book
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
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
  /**
   * @description Find a book
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
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
  /**
   * @description Find all books
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
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
  /**
   * @description Creates a new genre for books
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
  addBookGenre(request, response) {
    const { bookGenre } = request.body;
    if (bookGenre) {
      if (bookGenre.length < 3) {
        return response.status(400).send({
          message: 'Length of Genre is too short'
        });
      }
      if (!(/^[A-z]+$/).test(bookGenre)) {
        return response.status(400).send({
          message: 'Genre should contain alphabets only'
        });
      }
      const genre = bookGenre.toUpperCase();
      return BookGenre.findOne({
        where: {
          genre
        }
      }).then((foundGenre) => {
        if (foundGenre) {
          return response.status(409).send({
            message: 'Genre already exists'
          });
        }
        BookGenre.create({
          genre
        }).then((createdGenre) => {
          return response.status(201).send({
            message: 'Genre created',
            createdGenre: createdGenre.genre
          })
        })
      })
      .catch(() => {
        return response.status(500).send({
          message: 'Something went wrong'
        });
      })
    }
    return response.status(400).send({
      message: 'Genre is required'
    });
  },
  /**
   * @description Fetches all genre from database
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
  findAllGenre(request, response) {
    return BookGenre.findAll({}).then((genre) => {
      const organizedGenre = genre.map((aGenre) => aGenre.genre);
      return response.status(200).send({
        genre: organizedGenre
      });
    });
  },
  /**
   * @description Delete a book
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
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
  /**
   * @description Update a book's info
   * 
   * @param {object} request
   * @param {object} response
   * 
   * @returns {object} response
   */
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
