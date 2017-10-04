const createBook = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BookInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      returned: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('BookInfos'),
};
module.exports = createBook;
