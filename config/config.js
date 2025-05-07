require('dotenv').config();  // Load environment variables from the .env file

module.exports = {
  development: {
    username: process.env.DB_USERNAME,  // Use environment variable for username
    password: process.env.DB_PASSWORD,  // Use environment variable for password
    database: process.env.DB_DATABASE,  // Use environment variable for database name
    host: process.env.DB_HOST,          // Use environment variable for host
    dialect: process.env.DB_DIALECT,    // Use environment variable for dialect
    port: process.env.DB_PORT,          // Use environment variable for port
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
};
