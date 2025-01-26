const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,       // Database host
    dialect: process.env.DB_DIALECT, // Dialect: 'postgres', 'mysql', etc.
    logging: false,                  // Disable logging; set to console.log for debugging
    pool: {
      max: 5,    // Maximum number of connections in the pool
      min: 0,    // Minimum number of connections in the pool
      acquire: 30000, // Maximum time (ms) to wait for a connection
      idle: 10000,    // Maximum time (ms) that a connection can be idle
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
