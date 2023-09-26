const products = require("../../database/products.json");
const path = require("path");
const fs = require("fs");

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const newArrayProducts = products.filter((product) => product._id != id);

  const productsPath = path.join(__dirname, "../../database/products.json");
  const data = JSON.stringify(newArrayProducts);

  fs.writeFile(productsPath, data, (error) => {
    if (error) {
      res.sed(`Error: ${error}`);
    } else {
      res.redirect("/products");
    }
  });
};

module.exports = deleteProduct;
