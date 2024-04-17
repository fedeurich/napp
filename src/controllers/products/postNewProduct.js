const { validationResult } = require("express-validator");
const { Product, Category } = require("../../database/models");
const path = require("path");
const fs = require("fs");

const postNewProduct = async (req, res) => {
  console.log("Datos del formulario:", req.body);
  const errors = validationResult(req);

  try {
    const categories = await Category.findAll();
    

    if (errors.isEmpty()) {
      console.log("entre");
      const { productName, price, stock, category } = req.body;
      const image = req.file.filename;

      if (!category) {
        return res
          .status(400)
          .json({ error: "Category " });
      }

      if (!req.file) {
        throw new Error("Tienes que subir una imagen");
      }

      const newProduct = await Product.create({
        IDCategory: parseInt(category),
        NameProduct: productName,
        Price: parseFloat(price),
        Stock: stock,
        Image: image,
      });

      console.log("Producto creado:", newProduct);
      res.redirect("/products");
    } else {
      const ruta = path.join(__dirname, "../../views/products/newProduct.ejs");
      res.render(ruta, {
        categories,
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewProduct;
