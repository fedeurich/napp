const express = require("express");
const path = require("path");

const router = express.Router();

//Ruta del index(home)
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
});

module.exports = router;
