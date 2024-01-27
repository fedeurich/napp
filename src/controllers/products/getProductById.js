const { Product } = require("../../database/models");
const path = require("path");

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      // Si el producto no existe, puedes redirigir a una página de error
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "Product not found",
      });
    }

    // Renderiza la vista de detalles del producto con la información del producto
    const ruta = path.join(__dirname, "../../views/products/productDetail.ejs");
    res.render(ruta, { product });
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getProductById;
