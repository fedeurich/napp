const getAllClients = require("./getAllClients");
const getClientById = require("./getClientById");
const formNewClient = require("./formNewClient");
const postNewClient = require("./postNewClient");
const deleteClient = require("./deleteClient");
const confirmModifyClient = require("./confirmModifyClient");

module.exports = {
  getAllClients,
  formNewClient,
  postNewClient,
  deleteClient,
  getClientById,
  confirmModifyClient,

};
