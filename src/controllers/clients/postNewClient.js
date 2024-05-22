const { validationResult } = require("express-validator");
const { Client } = require("../../database/models");
const path = require("path");

const postNewClient = async (req, res) => {
  console.log("Datos del formulario:", req.body);
  const errors = validationResult(req);

  try {
    
    

    if (errors.isEmpty()) {
      console.log("entre");
      const { firstName, lastName, email, tel } = req.body;
      const image = req.file.filename;


      if (!req.file) {
        throw new Error("Tienes que subir una imagen");
      }

      const newClient = await Client.create({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Tel:tel,
        Image: image,
      });

      console.log("Cliente creado:", newClient);
      res.redirect("/clients");
    } else {
      const ruta = path.join(__dirname, "../../views/clients/newClient.ejs");
      
      
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

module.exports = postNewClient;