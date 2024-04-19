const { CateringType } = require("../../database/models"); // Asegúrate de importar el modelodesde el archivo correcto
const path = require("path");

const getCateringTypeById = async (req, res) => {
  const ruta = path.join(__dirname, "../../views/cateringTypes/cateringTypeDetail.ejs");
  const { id } = req.params;

  try {
    // Realiza una consulta a la base de datos para obtener por id
    const cateringType = await CateringType.findByPk(id);

    if (!cateringType) {
      // Si no existe, renderiza una vista de error 404
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "CateringType not found",
      });
    }

    // Renderiza la vista con los datos 
    res.render(ruta, { cateringType });
  } catch (error) {
    console.error("Error al obtener el tipo de categoria por ID:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getCateringTypeById;
