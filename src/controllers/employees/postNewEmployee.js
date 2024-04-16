const { validationResult } = require("express-validator");
const { Employee, Role } = require("../../database/models");
const path = require("path");
const fs = require("fs");

const postNewEmployee = async (req, res) => {
  console.log("Datos del formulario:", req.body);
  const errors = validationResult(req);

  try {
    const roles = await Role.findAll();
    

    if (errors.isEmpty()) {
      console.log("entre");
      const { firstName, lastName, email, paidLeave, role } = req.body;
      const image = req.file.filename;

      if (!role) {
        return res
          .status(400)
          .json({ error: "Role " });
      }

      if (!req.file) {
        throw new Error("Tienes que subir una imagen");
      }

      const newEmployee = await Employee.create({
        IDRole: parseInt(role),
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PaidLeave:paidLeave,
        Image: image,
      });

      console.log("Empleado creado:", newEmployee);
      res.redirect("/employees");
    } else {
      const ruta = path.join(__dirname, "../../views/employees/newEmployee.ejs");
      res.render(ruta, {
        roles,
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewEmployee;
