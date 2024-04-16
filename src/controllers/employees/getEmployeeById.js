const { Employee } = require("../../database/models");
const path = require("path");

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "Employee not found",
      });
    }

    const ruta = path.join(__dirname, "../../views/employees/employeeDetail.ejs");
    res.render(ruta, { employee });
  } catch (error) {
    console.error("Error al obtener detalles del empleado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getEmployeeById;
