const { validationResult } = require("express-validator");
const { Product } = require("../../database/models");
const path = require("path");
const fs = require("fs");

const postNewProduct = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const { productName, price, description, category, franchise } = req.body;
      const image = req.file.filename;

      if (!category || !franchise) {
        return res
          .status(400)
          .json({ error: "Category y Franchise son obligatorios" });
      }

      if (!req.file) {
        throw new Error("Tienes que subir una imagen");
      }

      const newProduct = await Product.create({
        IDCategory: parseInt(category),
        IDFranchise: parseInt(franchise),
        NameProduct: productName,
        Price: parseFloat(price),
        DescriptionProduct: description,
        Image: image,
      });

      console.log("Producto creado:", newProduct);
      res.redirect("/products");
    } catch (error) {
      console.error("Error al crear un nuevo producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  } else {
    res.render(path.join(__dirname, "../../views/products/newProduct.ejs"), {
      errors: errors.mapped(),
      oldData: req.body,
    });
  }
};

module.exports = postNewProduct;
