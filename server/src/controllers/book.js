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
        genre: req.body.genre
      })
      .then(newBook => res.status(201).send(newBook))
      .catch(error => res.status(400).send(error));
  },
  // find a book
  findOne(req, res) {
    return Book
      .findOne({
        where: { title: req.params.id
        } })
      .then((book) => {
        if (!book) {
          res.send('Book not found');
        } else {
          res.send(book);
        }
      }).catch(error => res.status(400).send(error));
  },
  // show all books
  findAll(req, res) {
    return Book
      .findAll({})
      .then((book) => {
        if (!book) {
          res.send('No book not found');
        } else {
          res.send(book);
        }
      }).catch(error => res.status(400).send(error));
  },
  // update a book's info
  findBook(req, res) {
    return Book
      .findBook({
        where: { id: req.params.id
        }
      })
      .then((book) => {
        if (!book) {
          res.send('No book not found');
        } else {
          return Book
            .update({
              cover: req.body.cover,
              pdf: req.body.pdf,
              title: req.body.title,
              author: req.body.author,
              description: req.body.description,
              quantity: req.body.quantity,
              genre: req.body.genre,
            });
        }
      }).catch(error => res.status(400).send(error));
  },
};
