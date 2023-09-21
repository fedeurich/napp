const path = require("path");

const formNewProduct = (req, res) => {
  const form = path.join(__dirname, "../../views/products/newProduct.ejs");

  res.render(form);
};

module.exports = formNewProduct;
