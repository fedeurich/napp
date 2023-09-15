const express = require("express");
const path = require("path");

const router = express.Router();

//Ruta del register
router.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/register.html"));
});

//Ruta del login
router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/login.html"));
});

module.exports = router;
