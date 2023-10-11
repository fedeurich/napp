const users = require("../../database/users.json");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const postNewUser = (req, res) => {
  const errors = validationResult(req);

  //Verifico que no haya errores en los datos ingresados por el usuario
  if (errors.errors.length == 0) {
    const { firstName, lastName, email, password } = req.body;

    //busco si el mail ya esta registrado
    let userInDB = false;
    users.forEach((user) => {
      if (user.email == email) {
        userInDB = true;
      }
    });

    //En caso de que este registrado devuelvo un mensaje a la vista
    if (userInDB) {
      res.render(path.join(__dirname, "../../views/users/register.ejs"), {
        errors: {
          email: { msg: "Este email ya esta registrado" },
        },
        oldData: req.body,
      });
    }

    //Genero un id para el nuevo usuario
    let newId;
    if (users.length == 0) {
      newId = 1;
    } else {
      newId = users[users.length - 1]._id + 1;
    }

    //Armo el objeto del nuevo usuario
    const newUser = {
      _id: newId,
      firstName,
      lastName,
      email,
      password: bcryptjs.hashSync(password, 10),
      image: req.file ? req.file.filename : "",
    };

    //Lo pusheo al array de ussuarios que importamos de users.json
    users.push(newUser);

    const usersPath = path.join(__dirname, "../../database/users.json");
    const data = JSON.stringify(users);

    //Agrego al nuevo usuario al json
    fs.writeFile(usersPath, data, (error) => {
      if (error) {
        res.sed(`Error: ${error}`);
      } else {
        res.redirect("/users");
      }
    });
  } else {
    //En caso de haber errores los devuelvo a la vista
    res.render(path.join(__dirname, "../../views/users/register.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = postNewUser;
