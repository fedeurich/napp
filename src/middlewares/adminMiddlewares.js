const { User } = require("../database/models");
const path = require("path");

const isUser = (req, res, next) => {
  res.locals.isLogged
    ? next()
    : res.render(path.join(__dirname, "../views/404NotFound"), {
        message: "Debes registrarte para ingresar",
      });
};

const guestMiddleware = (req, res, next) => {
  if (req.session.userLogged) {
    return res.redirect("/profile");
  }
  next();
};

const authMiddleware = (req, res, next) => {
  if (!req.session.userLogged) {
    return res.redirect("/login");
  }
  next();
};

const userLoggedMiddleware = async (req, res, next) => {
  res.locals.isLogged = false;

  try {
    if (req.cookies && req.session.userLogged) {
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

module.exports = {
  isUser,
  guestMiddleware,
  authMiddleware,
  userLoggedMiddleware,
};
