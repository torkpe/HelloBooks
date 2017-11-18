import model from '../models';

const { Book } = model;

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
      .then(newBook => response.status(201).send(newBook))
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // find a book
  findOne(request, response) {
    return Book
      .findOne({
        where: {
          id: request.params.id,
          deleted: false
        }
      })
      .then((book) => {
        if (!book) {
          response.status(404).send({ message: 'Book not found' });
        } else {
          response.status(200).send(book);
        }
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  // show all books
  findAll(request, response) {
    return Book
      .findAll({
        where: {
          deleted: false,
        }
      })
      .then((book) => {
        if (!book) {
          response.status(400).send('No book not found');
        } else {
          response.status(200).send(book);
        }
      }).catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  deleteBook(request, response) {
    return Book
      .findOne({
        where: {
          id: request.params.id
        }
      }).then((book) => {
        if (!book) {
          return response.status(404).send({ message: 'Book is not found' });
        }
        book.update({
          deleted: true
        }).then(deletedBook => response.status(200).send(deletedBook))
          .catch(() => response.status(500).send({ message: 'Something went wrong' }));
      })
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },

  // update a book's info
  editBook(request, response) {
    return Book
      .findOne({
        where: {
          id: `${request.params.id}`, // Check if user exists first
        }
      })
      .then((book) => {
        if (!book) {
          return response.status(404).send({ message: 'Book not found' });
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
          updatedBook
        }))
          .catch(() => response.status(500).send({ message: 'Something went wrong' }));
      })
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  }
};
