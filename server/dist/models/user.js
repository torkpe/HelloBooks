'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};