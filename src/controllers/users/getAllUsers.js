const users = require("../../database/users.json");

const infoUsers = users.map((user) => {
  return {
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    category: user.category,
  };
});

const getAllUsers = (req, res) => {
  res.send(infoUsers);
};

module.exports = getAllUsers;
