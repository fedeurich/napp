const { Employee } = require("../../database/models");

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el empleado en la base de datos
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).send("Empleado no encontrado");
    }

    // Eliminar el empleado
    await employee.destroy();

    res.redirect("/employees");
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = deleteEmployee;
