require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": null,
    "database": process.env.DB_NAME_DEV,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_USER,
    "password": null,
    "database": process.env.DB_NAME_TEST,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": 'DATABASE_URL',
    "username": process.env.DB_USER,
    "password": null,
    "database": process.env.DB_NAME_PROD,
    "host": "https://floating-savannah-19561.herokuapp.com/",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
