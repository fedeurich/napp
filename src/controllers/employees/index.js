const getAllEmployees = require("./getAllEmployees");
const getEmployeeById = require("./getEmployeeById");
const formNewEmployee = require("./formNewEmployee");
const postNewEmployee = require("./postNewEmployee");
const deleteEmployee = require("./deleteEmployee");
const confirmModifyEmployee = require("./confirmModifyEmployee");

module.exports = {
  getAllEmployees,
  formNewEmployee,
  postNewEmployee,
  deleteEmployee,
  getEmployeeById,
  confirmModifyEmployee,

};
