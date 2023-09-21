const products = require("../../database/products.json");
const path = require("path");
const fs = require("fs");

const postNewProduct = (req, res) => {
  //res.send(req.body);
  const { nombre, precio, descripcion, stock } = req.body;

  const newId = products[products.length - 1].id + 1;

  const newProduct = {
    id: newId,
    nombre,
    precio,
    descripcion,
    stock,
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
