// Se requiere el modelo user de la database
const { User } = require("../database/models");
const path = require("path");

// Si el usuario está loggeado, pasa a la siguiente, sino va a /login
const isUser = (req, res, next) => {
  res.locals.isLogged ? next() : res.redirect("/login");
};

// Si está loggeado muestra profile
const guestMiddleware = (req, res, next) => {
  if (req.session.userLogged) {
    return res.redirect("/profile");
  }
  next();
};

// Restringe ciertas rutas si no iniciaste sesión
const authMiddleware = (req, res, next) => {
  if (!req.session.userLogged) {
    return res.redirect("/login");
  }
  next();
};

// Verifica que un usuario esté loggeado si encuentra la cookie donde se almacena el email, y la compara con la bdd
const userLoggedMiddleware = async (req, res, next) => {
  res.locals.isLogged = false;

  try {
    if (req.cookies) {
      const emailInCookie = req.cookies.userEmail;
      const userFromCookie = await User.findOne({
        where: { email: emailInCookie },
      });

      if (userFromCookie) {
        res.locals.userLogged = userFromCookie;
      }
    }
  } catch (error) {
    console.error("Error al buscar usuario en la base de datos:", error);
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
};

// Exporta las const
module.exports = {
  isUser,
  guestMiddleware,
  authMiddleware,
  userLoggedMiddleware,
};
