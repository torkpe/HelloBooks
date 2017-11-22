const notification = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isTreated: DataTypes.BOOLEAN,
    from: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Notification;
};
module.exports = notification;
