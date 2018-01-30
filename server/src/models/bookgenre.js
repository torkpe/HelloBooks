const bookGenre = (sequelize, DataTypes) => {
  const BookGenre = sequelize.define('BookGenre', {
    genre: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return BookGenre;
};

module.exports = bookGenre;