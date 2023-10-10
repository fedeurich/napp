const users = require("../../database/users.json");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

const processLogin = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
  } else {
    res.render(path.join(__dirname, "../../views/users/login.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = processLogin;
