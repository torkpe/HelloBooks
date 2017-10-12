import model from '../models';

const Book = model.Book;

export default {
  create(req, res) {
    return Book
      .create({
        cover: req.body.cover,
        pdf: req.body.pdf,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        quantity: req.body.quantity,
        genre: req.body.genre,
      })
      .then(newBook => res.status(201).send(newBook))
      .catch(error => res.status(400).send({ message: error.message }));
  },
  // find a book
  findOne(req, res) {
    return Book
      .findOne({
        where: { id: req.params.id,
        } })
      .then((book) => {
        if (!book) {
          res.status(404).send('Book not found');
        } else {
          res.status(200).send(book);
        }
      }).catch(error => res.status(400).send({ message: error.message }));
  },
  // show all books
  findAll(req, res) {
    return Book
      .findAll({})
      .then((book) => {
        if (!book) {
          res.status(400).send('No book not found');
        } else {
          res.status(200).send(book);
        }
      }).catch(error => res.status(400).send({ message: error.message }));
  },
  deleteBook(req, res) {
    return Book
      .destroy({
        where: {
          id: req.params.id
        }
      }).then(deleted => res.status(200).send({ deleted }))
      .catch(err => res.status(400).send({ err }));
  },

  // update a book's info
  findBook(req, res) {
      return Book
        .findOne({
          where: { id: `${req.params.id}`, // Check if user exists first
          } })
        .then((book) => {
          if (!book) {
            return res.status(404).send({ message: 'Book not found' });
          }
          // Update user info
          book.update({
            cover: req.body.cover,
            pdf: req.body.pdf,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            quantity: req.body.quantity,
            genre: req.body.genre,
          }).then((updatedBook) => {
            return res.status(200).send({ updatedBook });
          }).catch(error => res.status(400).send(error.message));
        }).catch(error => res.status(400).send(error.message));
    }
};
