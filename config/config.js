require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "ABBA_DB_development",
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "ABBA_DB_test",
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "ABBA_DB_production",
    "host": process.env.SEQUELIZE_HOST,
    "dialect": "mysql"
  }
}
