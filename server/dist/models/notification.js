'use strict';

var notification = function notification(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    viewed: DataTypes.BOOLEAN,
    from: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Notification;
};
module.exports = notification;