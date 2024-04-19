const path = require("path");

const formNewCateringType = async (req, res) => {

  const form = path.join(__dirname, "../../views/clients/newCateringType.ejs");

  res.render(form);
};

module.exports = formNewCateringType;
