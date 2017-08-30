const user = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username is required'
      },
      unique: {
        args: true,
        msg: ' Username should be unique'
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Emails should be unique'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Empty field for email is not allowed'
        },
        len: {
          args: [10, 50],
          msg: 'Email Length should be between 10 to 50 characters'
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'User category has to be defined'
      }
    },
    star: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'User\'s star has to be defined'
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return User;
};
module.exports = user;
