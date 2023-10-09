const isUser = (req, res, next) => {
  const isUser = true;
  isUser ? next() : res.send("Debe registrarse para poder acceder");
};

module.exports = isUser;
