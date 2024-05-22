require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "bl4km374l",
    database: "m4",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "bl4km374l",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "bl4km374l",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
