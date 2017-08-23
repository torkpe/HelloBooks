'use strict';

var borrowBooks = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('BorrowBooks', {
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
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('BorrowBooks');
  }
};
module.exports = borrowBooks;