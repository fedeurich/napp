// controllers/deleteEvent.js
const path = require("path");
const { log } = require("console");
const { Event } = require("../../database/models");

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el evento en la base de datos
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).send("Evento no encontrado");
    }

    // Eliminar el evento
    const ruta = path.join(__dirname, "../../views/index.ejs");
    await event.destroy();

    res.redirect("/events");
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = deleteEvent;
