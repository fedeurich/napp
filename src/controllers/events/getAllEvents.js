const { Event, CateringType, Client } = require("../../database/models");
const path = require("path");

const getAllEvents = async (req, res) => {
  try {
    // Obtener todos los eventos con sus datos asociados
    const allEvents = await Event.findAll({
      include: [
        {
          model: CateringType,
          as: "CateringType",
          attributes: ["IDCateringType", "NameCateringType"],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["IDClient", "FirstName", "LastName"],
        },
        
      ],


    });

    const ruta = path.join(__dirname, "../../views/events/events.ejs");
    res.render( ruta, { allEvents });
  } catch (error) {
    console.error("Error al obtener todos los eventos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getAllEvents