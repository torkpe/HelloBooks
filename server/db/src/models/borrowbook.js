const borrowbook = (sequelize, DataTypes) => {
  const Book = sequelize.model('Book');
  const BorrowBook = sequelize.define('BorrowBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    returned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  BorrowBook.belongsTo(Book, { foreignKey: 'bookId' });
  return BorrowBook;
};
module.exports = borrowbook;
