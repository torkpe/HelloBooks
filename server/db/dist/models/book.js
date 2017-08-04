'use strict';

var book = function book(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    cover: DataTypes.STRING,
    pdf: DataTypes.STRING,
    quantity: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.STRING

  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};
module.exports = book;