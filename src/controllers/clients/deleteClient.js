//constrollers/clients/deleteClient.js
const path = require("path");
const { log } = require("console");
const { Client } = require("../../database/models");

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el cliente en la base de datos
    const clientId = req.params.id;
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).send("Cliente no encontrado");
    }

    // Eliminar el cliente
    const ruta = path.join(__dirname, "../../views/index.ejs");
    await client.destroy();

    res.redirect("/clients");
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = deleteClient;
