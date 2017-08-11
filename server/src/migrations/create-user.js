const createUser = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        isAlphanumeric: true,
        len: [5, 15],
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        isAlphanumeric: true,
        len: [5, 15],
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        isAlphanumeric: true,
        len: [5, 15],
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users'),
};
module.exports = createUser;

