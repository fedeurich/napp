// controllers/products/getProductById.js
const { Product } = require('../../database/models');  // Asegúrate de importar el modelo Product desde el archivo correcto
const path = require('path');

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Usa el método findById del modelo Product
    const product = await Product.findById(id);

    if (!product) {
      // Si no se encuentra el producto, renderiza una página de error
      const errorPagePath = path.join(__dirname, '../../views/404notfound');
      return res.render(errorPagePath, { message: 'Product not found' });
    }

    // Renderiza la página del producto
    const productPagePath = path.join(__dirname, '../../views/products/product.ejs');
    res.render(productPagePath, { product });
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = getProductById;
