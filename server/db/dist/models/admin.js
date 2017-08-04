'use strict';

var admin = function admin(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Admin;
};
module.exports = admin;