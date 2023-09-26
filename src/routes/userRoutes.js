const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllUsers,
  getUserById,
  formNewUser,
  postNewUser,
} = require("../controllers/users");

//Ruta del register
router.get("/register", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/users/register.ejs");
  res.render(ruta);
});

//Ruta del login
router.get("/login", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/users/login.ejs");
  res.render(ruta);
});

//Ruta para ver todos los productos
router.get("/users", getAllUsers);

//Rutas para crear productos
router.get("/new-user", formNewUser);
router.post("/users", postNewUser);

module.exports = router;
