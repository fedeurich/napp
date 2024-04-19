const { validationResult } = require("express-validator");
const { CateringType } = require("../../database/models");
const path = require("path");
const fs = require("fs");

const postNewCateringType = async (req, res) => {
  console.log("Datos del formulario:", req.body);
  const errors = validationResult(req);

  try {
    
    

    if (errors.isEmpty()) {
      console.log("entre");
      const { nameCateringType, employeesRequired, productsRequired } = req.body;
      


      if (!req.file) {
        throw new Error("Tienes que subir una imagen");
      }

      const newCateringType = await CateringType.create({
        NameCateringType: nameCateringType,
        EmployeesRequired: employeesRequired,
        ProductsRequired: productsRequired,
      });

      console.log("Tipo de Categoria creado:", newCateringType);
      res.redirect("/cateringTypes");
    } else {
      const ruta = path.join(__dirname, "../../views/cateringTypes/newCateringType.ejs");
      
      
      res.render(ruta, {
        errors: errors.mapped(),
        oldData: req.body,
      });


    }
  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewCateringType;
