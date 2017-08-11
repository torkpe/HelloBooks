const admin = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username is required'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Empty field for username is not allowed'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Username should contain alphabets and numbers allowed only'
        },
        len: {
          args: [5, 15],
          msg: 'Username should be between 5 to 15 characters'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Empty field for password is not allowed'
        },
        len: {
          args: [5, 100],
          msg: 'Password length should be between 5 to 15 characters'
        },
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Admin;
};
module.exports = admin;
