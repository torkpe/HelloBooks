const requests = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('requests', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        message: {
          type: Sequelize.STRING,
          allowNull: {
            args: false,
            msg: 'Message is required'
          },
        },
        viewed: {
          type: Sequelize.BOOLEAN,
          allowNull: {
            args: false,
            msg: 'Viewed is required'
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: {
            args: false,
            msg: 'userId is required'
          },
        },
        from: {
          type: Sequelize.STRING,
          allowNull: {
            args: false,
            msg: 'from is required'
          },
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
  module.exports = requests;
  