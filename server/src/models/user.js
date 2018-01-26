const user = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Full name should be between 3 to 100 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Emails should be unique',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Empty field for email is not allowed',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Empty field for password is not allowed',
        },
        len: {
          args: [5, 100],
          msg: 'Password length should be between 5 to 100 characters',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'User category has to be defined',
      },
    },
    star: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'User\'s star has to be defined',
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'User must be confirmed',
      },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'key must be provided',
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return User;
};
module.exports = user;
