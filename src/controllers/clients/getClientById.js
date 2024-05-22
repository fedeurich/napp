const { Client } = require("../../database/models"); // Asegúrate de importar el modelo User desde el archivo correcto
const path = require("path");

const getClientById = async (req, res) => {
  const ruta = path.join(__dirname, "../../views/clients/clientDetail.ejs");
  const { id } = req.params;

  try {
    // Realiza una consulta a la base de datos para obtener el usuario por ID
    const client = await Client.findByPk(id);

    if (!client) {
      // Si el usuario no existe, renderiza una vista de error 404
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "User not found",
      });
    }

    // Renderiza la vista con los datos del usuario
    res.render(ruta, { client });
  } catch (error) {
    console.error("Error al obtener cliente por ID:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getClientById;