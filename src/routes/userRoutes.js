const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const { getAllUsers, getUserById } = require("../controllers/users");

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

module.exports = router;
