'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notification = {
  up: function up(queryInterface, Sequelize) {
    var _queryInterface$creat;

    return queryInterface.createTable('Notifications', (_queryInterface$creat = {
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
      }
    }, _defineProperty(_queryInterface$creat, 'userId', {
      type: Sequelize.INTEGER,
      allowNull: {
        args: false,
        msg: 'userId is required'
      }
    }), _defineProperty(_queryInterface$creat, 'from', {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'from is required'
      }
    }), _defineProperty(_queryInterface$creat, 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _defineProperty(_queryInterface$creat, 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _queryInterface$creat));
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Notifications');
  }
};
module.exports = notification;