const { CateringTipe } = require("../../database/models");
const path = require("path");

const confirmModifyCateringTipe = async (req, res) => {
  const { id } = req.params;

  try {
    const cateringTipe = await CateringTipe.findByPk(id);

    if (!cateringTipe) {
      // Si no se encuentra el tipo, renderiza una página de error
      const errorPagePath = path.join(__dirname, "../../views/404notfound");
      return res.render(errorPagePath, { message: "cateringTipe not found" });
    }

    cateringTipe.NameCateringType = req.body.nameCateringType;
    cateringTipe.EmployeesRequired = req.body.employeesRequired;
    cateringTipe.Email = req.body.cateringRequired;
  

    // Guarda los cambios en la base de datos
    await cateringTipe.save();

    // Redirecciona a la página de tipo de catering después de la modificación
    res.redirect("/cateringTypes");
  } catch (error) {
    console.error("Error al modificar el tipo de  catering:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = confirmModifyCateringTipe;
