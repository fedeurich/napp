const path = require("path");
const { Category } = require("../../database/models");

const formNewProduct = async (req, res) => {
  const categories = await Category.findAll();

  const form = path.join(__dirname, "../../views/products/newProduct.ejs");

  res.render(form, { categories});
};

module.exports = formNewProduct;
