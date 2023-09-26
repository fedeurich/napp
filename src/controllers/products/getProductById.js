const products = require("../../database/products.json");

const getPeroductById = (req, res) => {
  const { _id } = req.params;

  const product = products.find((prod) => prod._id == _id);

  if (!product) {
    ruta = path.join(__dirname, "../../views/404notfound");
    return res.render(ruta, { message: "User not found" });
  }

  res.send(product);
};

module.exports = getPeroductById;
