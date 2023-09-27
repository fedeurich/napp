const users = require("../../database/users.json");
const path = require("path");

const getAllUsers = (req, res) => {
  const ruta = path.join(__dirname, "../../views/users/users.ejs");
  res.render(ruta, { allUsers: users });
};

module.exports = getAllUsers;
