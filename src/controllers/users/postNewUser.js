const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { User } = require("../../database/models");  // Asegúrate de importar correctamente el modelo User

const postNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Si hay errores de validación, renderiza la vista de registro con los errores
      return res.render(path.join(__dirname, "../../views/users/register.ejs"), {
        errors: errors.array(),
        oldData: req.body,
      });
    }

    // Verifica si se subió correctamente la imagen
    if (!req.file) {
      throw new Error("Tienes que subir una imagen");
    }

    // Desestructura los datos del cuerpo y la imagen del request
    const { firstName, lastName, email, password } = req.body;
    const image = req.file.filename;

    // Verifica si el correo ya está registrado
    const userInDB = await User.findOne({ where: { email } });
    if (userInDB) {
      return res.render(path.join(__dirname, "../../views/users/register.ejs"), {
        errors: {
          email: { msg: "Este email ya está registrado" },
        },
        oldData: req.body,
      });
    }

    // Crea el nuevo usuario
    const newUser = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PasswordUser: bcryptjs.hashSync(password, 10),
      Image: image,
    });

    console.log('Usuario creado:', newUser);
    res.redirect("/users");  // Puedes redirigir a la página que desees después de crear el usuario
  } catch (error) {
    console.error('Error en el controlador postNewUser:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = postNewUser;

