const { Employee } = require("../../database/models");
const path = require("path");

const confirmModifyEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      // Si no se encuentra el empleado, renderiza una página de error
      const errorPagePath = path.join(__dirname, "../../views/404notfound");
      return res.render(errorPagePath, { message: "Employee not found" });
    }

    employee.FirstName = req.body.firstName;
    employee.LastName = req.body.lastName;
    employee.Email = req.body.email;
    employee.PaidLeave = req.body.paidLeave;

    // Guarda los cambios en la base de datos
    await employee.save();

    // Redirecciona a la página de empleados después de la modificación
    res.redirect("/employees");
  } catch (error) {
    console.error("Error al modificar el empleado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = confirmModifyEmployee;
