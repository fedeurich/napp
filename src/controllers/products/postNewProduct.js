const products = require("../../database/products.json");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

const postNewProduct = (req, res) => {
  const errors = validationResult(req);

  if (errors.errors.length == 0) {
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
  } else {
    res.render(path.join(__dirname, "../../views/products/newProduct.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = postNewProduct;
