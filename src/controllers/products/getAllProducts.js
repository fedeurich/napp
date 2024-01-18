const { Product } = require('../../database/models');
const path = require('path');

const getAllProducts = async (req, res) => {
  try {
    // Obtener todos los productos de la base de datos
    const allProducts = await Product.findAll();

    // Ruta al archivo EJS
    const ruta = path.join(__dirname, '../../views/products/products.ejs');

    // Renderizar la vista con la lista de productos
    res.render(ruta, { allProducts });
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = getAllProducts;
