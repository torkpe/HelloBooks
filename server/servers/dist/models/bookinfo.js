'use strict';

var bookInfo = function bookInfo(sequelize, DataTypes) {
  var BookInfo = sequelize.define('BookInfo', {
    bookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return BookInfo;
};
module.exports = bookInfo;