'use strict';

var book = function book(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    cover: DataTypes.STRING,
    pdf: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
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