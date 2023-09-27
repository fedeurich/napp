const users = require("../../database/users.json");
const path = require("path");
const fs = require("fs");

const postNewUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newId = users[users.length - 1]._id + 1;

  const newUser = {
    _id: newId,
    firstName,
    lastName,
    email,
    password,
    image: req.file ? req.file.filename : "usuarioSinImagen.jpg",
  };

  users.push(newUser);

  const usersPath = path.join(__dirname, "../../database/users.json");
  const data = JSON.stringify(users);

  fs.writeFile(usersPath, data, (error) => {
    if (error) {
      res.sed(`Error: ${error}`);
    } else {
      res.redirect("/users");
    }
  });
};

module.exports = postNewUser;
