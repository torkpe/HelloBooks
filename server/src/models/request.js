const userRequests = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: DataTypes.STRING,
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Request;
};
module.exports = userRequests;
