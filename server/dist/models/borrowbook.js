'use strict';

var borrowbook = function borrowbook(sequelize, DataTypes) {
  var Book = sequelize.model('Book');
  var BorrowBook = sequelize.define('BorrowBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    returned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  BorrowBook.belongsTo(Book, { foreignKey: 'bookId' });
  return BorrowBook;
};
module.exports = borrowbook;