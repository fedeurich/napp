const path = require("path");
const { Role } = require("../../database/models");

const formNewEmployee = async (req, res) => {
  const roles = await Role.findAll();

  const form = path.join(__dirname, "../../views/employees/newEmployee.ejs");

  res.render(form, { roles});
};

module.exports = formNewEmployee;
