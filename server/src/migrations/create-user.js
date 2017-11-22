const createUser = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        isAlphanumeric: true,
        len: [5, 45],
      },
      star: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      password: {
        type: Sequelize.STRING,
        isAlphanumeric: true,
        len: [5, 15],
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users'),
};
module.exports = createUser;

