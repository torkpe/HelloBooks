'use strict';

var notification = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Notifications', {
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
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: {
          args: false,
          msg: 'Type is required'
        }
      },
      viewed: {
        type: Sequelize.BOOLEAN,
        allowNull: {
          args: false,
          msg: 'Viewed is required'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: {
          args: false,
          msg: 'userId is required'
        }
      },
      from: {
        type: Sequelize.STRING,
        allowNull: {
          args: false,
          msg: 'from is required'
        }
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
    return queryInterface.dropTable('Notifications');
  }
};
module.exports = notification;