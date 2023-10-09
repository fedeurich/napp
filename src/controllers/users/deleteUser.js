const users = require("../../database/users.json");
const path = require("path");
const fs = require("fs");

const deleteUser = (req, res) => {
  const { id } = req.params;

  const newArrayUsers = users.filter((user) => user._id != id);

  const usersPath = path.join(__dirname, "../../database/users.json");
  const data = JSON.stringify(newArrayUsers);

  fs.writeFile(usersPath, data, (error) => {
    if (error) {
      res.sed(`Error: ${error}`);
    } else {
      res.redirect("/users");
    }
  });
};

module.exports = deleteUser;
