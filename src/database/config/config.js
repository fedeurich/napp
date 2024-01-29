require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "ecommerce_dbtest",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "Jfu36647067",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "Jfu36647067",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
