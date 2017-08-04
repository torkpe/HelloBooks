const bookInfo = (sequelize, DataTypes) => {
  const BookInfo = sequelize.define('Book', {
    bookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return BookInfo;
};
module.exports = bookInfo;
