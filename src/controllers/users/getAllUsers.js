const path = require("path");

const { User } = require('../../database/models'); // Asegúrate de importar el modelo User desde el archivo correcto

const getAllUsers = async (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener todos los usuarios
    const allUsers = await User.findAll();

    // Renderiza la vista con la lista de usuarios obtenida de la base de datos
    const ruta = path.join(__dirname, "../../views/users/users.ejs");
    res.render(ruta, { allUsers });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = getAllUsers;
