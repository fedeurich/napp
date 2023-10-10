const getAllUsers = require("./getAllUsers");
const getUserById = require("./getUserById");
const formNewUser = require("./formNewUser");
const postNewUser = require("./postNewUser");
const deleteUser = require("./deleteUser");
const loginUsers = require("./loginUsers");

module.exports = {
  getAllUsers,
  formNewUser,
  postNewUser,
  getUserById,
  deleteUser,
  loginUsers,
};
