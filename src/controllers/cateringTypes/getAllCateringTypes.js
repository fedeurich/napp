const { CateringType } = require("../../database/models");
const path = require("path");

const getAllCateringTypes = async (req, res) => {
  try {
    const allCateringTypes = await CateringType.findAll();

    const ruta = path.join(__dirname, "../../views/cateringTypes/cateringTypes.ejs");

    res.render(ruta, { allCateringTypes });
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getAllCateringTypes;
