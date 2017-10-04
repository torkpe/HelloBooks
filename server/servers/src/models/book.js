const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    cover: DataTypes.STRING,
    pdf: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    description: DataTypes.STRING

  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Book;
};
module.exports = book;
