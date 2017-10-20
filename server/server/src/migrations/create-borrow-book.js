const borrowBooks = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BorrowBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      returned: {
        type: Sequelize.BOOLEAN
      },
      returnDate: {
        type: Sequelize.DATE
      },
      owing: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
    queryInterface.dropTable('BorrowBooks'),
};
module.exports = borrowBooks;
