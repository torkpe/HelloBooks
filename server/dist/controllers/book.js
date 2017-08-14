'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book;

exports.default = {
  create: function create(req, res) {
    return Book.create({
      cover: req.body.cover,
      pdf: req.body.pdf,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      quantity: req.body.quantity,
      genre: req.body.genre
    }).then(function (newBook) {
      return res.status(201).send(newBook);
    }).catch(function (error) {
      return res.status(400).send({ message: 'You have made an invalid request' });
    });
  },

  // find a book
  findOne: function findOne(req, res) {
    return Book.findOne({
      where: { title: req.params.id
      } }).then(function (book) {
      if (!book) {
        res.send('Book not found');
      } else {
        res.send(book);
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },

  // show all books
  findAll: function findAll(req, res) {
    return Book.findAll({}).then(function (book) {
      if (!book) {
        res.send('No book not found');
      } else {
        res.send(book);
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },

  // update a book's info
  findBook: function findBook(req, res) {
    return Book.findBook({
      where: { id: req.params.id
      }
    }).then(function (book) {
      if (!book) {
        res.send('No book not found');
      } else {
        return Book.update({
          cover: req.body.cover,
          pdf: req.body.pdf,
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          quantity: req.body.quantity,
          genre: req.body.genre
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};