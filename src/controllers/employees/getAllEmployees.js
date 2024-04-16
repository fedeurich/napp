const { Employee, Role } = require("../../database/models");
const path = require("path");

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.findAll({
      include: [
        {
          model: Role,
          as: "Role",
          attributes: ["IDRole", "NameRole"],
        },
        
      ],
    });

    const ruta = path.join(__dirname, "../../views/employees/employees.ejs");

    res.render(ruta, { allEmployees });
  } catch (error) {
    console.error("Error al obtener todos los empleados:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getAllEmployees;
