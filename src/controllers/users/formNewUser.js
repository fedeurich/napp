const path = require("path");

const formNewUser = (req, res) => {
  const user = path.join(__dirname, "../../views/users/newUser.ejs");

  res.render(user);
};

module.exports = formNewUser;
