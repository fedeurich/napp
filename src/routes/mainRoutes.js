const express = require("express");
const path = require("path");

const router = express.Router();

//Ruta del index(home)
/*router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
});
*/
router.get("/", (req, res) => {
  const ruta = path.join(__dirname, "../views/index");
  res.render(ruta);
});

module.exports = router;
