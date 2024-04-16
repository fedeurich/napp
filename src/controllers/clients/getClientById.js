const { Client } = require("../../database/models");
const path = require("path");

const getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "Client not found",
      });
    }

    const ruta = path.join(__dirname, "../../views/clients/clientDetail.ejs");
    res.render(ruta, { client });
  } catch (error) {
    console.error("Error al obtener detalles del client:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getClientById;
