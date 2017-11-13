'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  bookValidator: function bookValidator(req, res, next) {
    var _req$body = req.body,
        cover = _req$body.cover,
        pdf = _req$body.pdf,
        title = _req$body.title,
        author = _req$body.author,
        description = _req$body.description,
        quantity = _req$body.quantity,
        genre = _req$body.genre;

    console.log(typeof quantity === 'undefined' ? 'undefined' : _typeof(quantity));
    if (String(cover).length < 30) {
      return res.status(400).send({
        message: 'You seem to have input an invalid url to your cover photo'
      });
    }
    if (String(pdf).length < 30) {
      return res.status(400).send({
        message: 'You seem to have input an invalid url to your cover pdf'
      });
    }
    if (String(title).length < 10) {
      return res.status(400).send({
        message: 'Title is too short'
      });
    }
    if (String(author).length < 5) {
      return res.status(400).send({
        message: 'Author\'s name is too short'
      });
    }
    if (String(description).length < 15) {
      return res.status(400).send({
        message: 'Your description for this book seems to be too short'
      });
    }
    if (quantity <= 0) {
      return res.status(400).send({
        message: 'This proposed quantity is too small to create a new book'
      });
    }
    if (String(genre).length < 4) {
      return res.status(400).send({
        message: 'This does not seem to be a valid book genre'
      });
    }
    next();
  }
};