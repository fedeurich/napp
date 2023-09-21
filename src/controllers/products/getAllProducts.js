const products = require("../../database/products.json");
const path = require("path");

const getAllProducts = (req, res) => {
  const ruta = path.join(__dirname, "../../views/products/products.ejs");
  res.render(ruta, { allProducts: products });
};

module.exports = getAllProducts;
