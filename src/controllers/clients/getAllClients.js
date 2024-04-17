const { Client } = require("../../database/models");
const path = require("path");

const getAllClients = async (req, res) => {
  try {
    const allClients = await Client.findAll();

    const ruta = path.join(__dirname, "../../views/clients/clients.ejs");

    res.render(ruta, { allClients });
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getAllClients;
