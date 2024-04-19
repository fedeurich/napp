//constrollers/clients/deleteCateringType.js
const path = require("path");
const { log } = require("console");
const { CateringType } = require("../../database/models");

const deleteCateringType = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el tipo de catering en la base de datos
    const cateringTypeId = req.params.id;
    const cateringType = await CateringType.findByPk(cateringTypeId);

    if (!cateringType) {
      return res.status(404).send("Cliente no encontrado");
    }

    // Eliminar el tipo catering
    const ruta = path.join(__dirname, "../../views/index.ejs");
    await cateringType.destroy();

    res.redirect("/cateringTypes");
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = deleteCateringType;
