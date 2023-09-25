const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

//Ruta del index(home)
router.get("/", (req, res) => {
  const ruta = path.join(__dirname, "../views/index");
  res.render(ruta);
});

module.exports = router;
