const { Client } = require("../../database/models");
const path = require("path");

const confirmModifyClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      // Si no se encuentra el cliente, renderiza una página de error
      const errorPagePath = path.join(__dirname, "../../views/404notfound");
      return res.render(errorPagePath, { message: "client not found" });
    }

    client.FirstName = req.body.firstName;
    client.LastName = req.body.lastName;
    client.Email = req.body.email;
  

    // Guarda los cambios en la base de datos
    await client.save();

    // Redirecciona a la página de clientes después de la modificación
    res.redirect("/clients");
  } catch (error) {
    console.error("Error al modificar el cliente:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = confirmModifyClient;
