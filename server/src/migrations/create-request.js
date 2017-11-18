const userRequest = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      bookId: {
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
    queryInterface.dropTable('Requests'),
};
module.exports = userRequest;
