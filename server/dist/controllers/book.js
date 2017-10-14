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
      genre: req.body.genre,
      deleted: false
    }).then(function (newBook) {
      return res.status(201).send(newBook);
    }).catch(function (error) {
      return res.status(400).send({ message: error.message });
    });
  },

  // find a book
  findOne: function findOne(req, res) {
    return Book.findOne({
      where: { id: req.params.id,
        deleted: false
      } }).then(function (book) {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        res.status(200).send(book);
      }
    }).catch(function (error) {
      return res.status(400).send({ message: error.message });
    });
  },

  // show all books
  findAll: function findAll(req, res) {
    return Book.findAll({
      where: {
        deleted: false
      }
    }).then(function (book) {
      if (!book) {
        res.status(400).send('No book not found');
      } else {
        res.status(200).send(book);
      }
    }).catch(function (error) {
      return res.status(400).send({ message: error.message });
    });
  },
  deleteBook: function deleteBook(req, res) {
    return Book.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (book) {
      if (!book) {
        return res.status(404).send({ message: 'Book is not found' });
      }
      book.update({
        deleted: false
      });
    }).catch(function (err) {
      return res.status(400).send({ err: err });
    });
  },


  // update a book's info
  findBook: function findBook(req, res) {
    return Book.findOne({
      where: { id: '' + req.params.id // Check if user exists first
      } }).then(function (book) {
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
        genre: req.body.genre
      }).then(function (updatedBook) {
        return res.status(200).send({ updatedBook: updatedBook });
      }).catch(function (error) {
        return res.status(400).send(error.message);
      });
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};