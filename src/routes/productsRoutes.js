const express = require("express");
const path = require("path");

const router = express.Router();

const { getAllProducts, getPeroductById } = require("../controllers/products");

router.get("/products", getAllProducts);

//Ruta del carrito de compra
router.get("/productCart", (req, res) => {
  const ruta = path.join(__dirname, "../views/products/productCart.ejs");
  res.render(ruta);
});

//Ruta del menu de porductos
router.get("/productMenu", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/products/productMenu.ejs")
  res.render(ruta);
});

//Ruta del detalle del producto
router.get("/productDetail", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/products/productDetail.ejs")
  res.render(ruta);
});

module.exports = router;
