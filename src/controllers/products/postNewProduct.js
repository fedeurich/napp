const { validationResult } = require("express-validator");
const { Product } = require('../../database/models');  // Asegúrate de importar el modelo Product desde el archivo correcto
const path = require("path");
const fs = require("fs");

const postNewProduct = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const { productName, price, description, category, color, IDType } = req.body;

      // Resto del código...

      // Crea un nuevo producto utilizando Sequelize
      const newProduct = await Product.create({
        IDType,
        NameProduct: productName,
        Price: price,
        DescriptionProduct: description,
        IDCategory: category,
        // Resto de las propiedades...
      });

      // Resto del código...

    } catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      res.status(500).send('Error interno del servidor');
    }
  } else {
    res.render(path.join(__dirname, "../../views/products/newProduct.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = postNewProduct;
