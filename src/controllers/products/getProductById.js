const products = require("../../database/products.json");
const path = require("path");

const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find((prod) => prod._id == id);

  if (!product) {
    ruta = path.join(__dirname, "../../views/404notfound");
    return res.render(ruta, { message: "Product not found" });
  }

  const form = path.join(__dirname, "../../views/products/product.ejs");
  res.render(form, { product: product });
};

module.exports = getProductById;
