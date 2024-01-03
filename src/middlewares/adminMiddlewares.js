const isUser = (req, res, next) => {
  const isUser = true;
  isUser ? next() : res.send("Debe registrarse para poder acceder");
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

const userLoggedMiddleware = (req, res, next) => {
  res.locals.isLogged = false;

  // Requierela utilizacion de models
  // const emailInCookie = req.cookies.userEmail;
  // const userFromCookie = User.findByField("email", emailInCookie);

  // if (userFromCookie) {
  //   req.session.userLogged = userFromCookie;
  // }

  if (req.session && req.session.userLogged) {
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
