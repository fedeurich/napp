const users = require("../../database/users.json");
const path = require("path");
const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const processLogin = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password } = req.body;

    let userToLogin;
    users.forEach((user) => {
      if (user.email == email) {
        userToLogin = email;
      }
    });

    if (userToLogin) {
      let passwordToLogin;
      users.forEach((user) => {
        if (user.email == email) {
          if (bcryptjs.hashSync(password, user.password)) {
            passwordToLogin = true;
          }
        }
      });
      if (passwordToLogin) {
        res.send("Iniciaste secion con exito");
      } else {
        res.render(path.join(__dirname, "../../views/users/login.ejs"), {
          errors: {
            email: {
              msg: "El email o la contraseña no coinciden",
            },
            password: {
              msg: "El email o la contraseña no coinciden",
            },
          },
        });
      }
    } else {
      res.render(path.join(__dirname, "../../views/users/login.ejs"), {
        errors: {
          email: {
            msg: "El email o la contraseña no coinciden",
          },
          password: {
            msg: "El email o la contraseña no coinciden",
          },
        },
      });
    }
    res.render();
  } else {
    res.render(path.join(__dirname, "../../views/users/login.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = processLogin;
