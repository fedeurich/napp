const getAllUsers = require("./getAllUsers");
const getUserById = require("./getUserById");
const formNewUser = require("./formNewUser");
const postNewUser = require("./postNewUser");
const deleteUser = require("./deleteUser");
const loginUsers = require("./loginUsers");
const processLogin = require("./processLogin");

module.exports = {
  getAllUsers,
  formNewUser,
  postNewUser,
  getUserById,
  deleteUser,
  loginUsers,
  processLogin,
};
