require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "Jfu36647067",
    database: "m7",
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
