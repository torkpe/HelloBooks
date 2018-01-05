const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: '127.0.0.1',
    port: '5433',
    dialect: 'postgres',
  },
  travis: {
    use_env_variable: 'DB_TEST_URL',
  },
  production: {
    use_env_variable: 'PRODUCTION_DATABASE_URL',
  },
};
module.exports = config;
