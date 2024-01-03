const users = require("../../database/users.json");
const path = require("path");
const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const processLogin = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password, remember } = req.body;

    // Buscar el usuario por su email
    const userToLogin = users.find((user) => user.email === email);

    if (userToLogin) {
      // Verificar si la contraseña coincide utilizando bcrypt
      if (
        userToLogin.password &&
        bcryptjs.compareSync(password, userToLogin.password)
      ) {
        // Eliminar la contraseña antes de almacenar el usuario en la sesión
        const userWithoutPassword = { ...userToLogin };
        delete userWithoutPassword.password;
        req.session.userLogged = userWithoutPassword;

        console.remember;
        if (remember) {
          res.cookie("userEmail", email, { maxAge: 1000 * 60 * 2 });
        }

        return res.redirect("profile");
      } else {
        // Contraseña incorrecta
        return res.render(path.join(__dirname, "../../views/users/login.ejs"), {
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
      // Usuario no encontrado o contraseña no definida
      return res.render(path.join(__dirname, "../../views/users/login.ejs"), {
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
    // Errores de validación
    return res.render(path.join(__dirname, "../../views/users/login.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = processLogin;
