const users = require("../../database/users.json");
const path = require("path");

const getUserById = (req, res) => {
  let ruta = path.join(__dirname, "../../views/users/user.ejs");

  const { id } = req.params;

  const user = users.find((user) => user._id == id);

  if (!user) {
    ruta = path.join(__dirname, "../../views/404NotFound");
    return res.render(ruta, { message: "User not found" });
  }


  res.render(ruta, { user });
};

module.exports = getUserById;
