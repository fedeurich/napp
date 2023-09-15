const express = require("express");
const path = require("path");

const router = express.Router();

//Ruta del carrito de compra
router.get("/productCart", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/productCart.html"));
});

//Ruta del menu de porductos
router.get("/productMenu", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/productMenu.html"));
});

//Ruta del detalle del producto
router.get("/productDetail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/productDetail.html"));
});

module.exports = router;
