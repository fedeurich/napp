const products = require("../../database/products.json");
const fs = require("fs");
const path = require("path");

const confirmModifyProduct = (req, res) => {
  const { id } = req.params;

  const { productName, price, description } = req.body;

  products.forEach((product) => {
    if (product._id == id) {
      product._id = id;
      product.productName = productName;
      product.price = price;
      product.description = description;
    }
  });

  const productPath = path.join(__dirname, "../../database/products.json");
  const data = JSON.stringify(products);

  fs.write(productPath, data, (error) => {
    if (error) {
      res.send(`Error: ${error}`);
    } else {
      res.redirect("/products");
    }
  });
};

module.exports = confirmModifyProduct;
