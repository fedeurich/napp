const path = require("path");

const formNewClient = async (req, res) => {

  const form = path.join(__dirname, "../../views/clients/newClient.ejs");

  res.render(form);
};

module.exports = formNewClient;
