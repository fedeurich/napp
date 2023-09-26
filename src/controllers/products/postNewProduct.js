const products = require("../../database/products.json");
const path = require("path");
const fs = require("fs");

const postNewProduct = (req, res) => {
  const { productName, price, description, category, color } = req.body;

  const newId = products[products.length - 1]._id + 1;

  const newProduct = {
    _id: newId,
    category,
    color,
    description,
    image: req.file ? req.file.filename : "productoSinImagen.png",
    price,
    productName,
  };

  products.push(newProduct);

  const productsPath = path.join(__dirname, "../../database/products.json");
  const data = JSON.stringify(products);

  fs.writeFile(productsPath, data, (error) => {
    if (error) {
      res.sed(`Error: ${error}`);
    } else {
      res.redirect("/products");
    }
  });
};

module.exports = postNewProduct;
