const { Event } = require("../../database/models");
const path = require("path");

const confirmModifyEvent = async (req, res) => {
  const { id } = req.params.id;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      // Si no se encuentra el evento, renderiza una página de error
      const errorPagePath = path.join(__dirname, "../../views/404notfound");
      return res.render(errorPagePath, { message: "Event not found" });
    }

    // Actualiza los campos del evento con los datos del formulario
    
    event.AddressEvent = req.body.addressEvent;
    event.DateEvent = req.body.dateEvent;
    event.IDCateringType = req.body.cateringType;
    event.IDClient = req.body.client;

    // Guarda los cambios en la base de datos
    await event.save();

    // Redirecciona a la página de eventos después de la modificación
    res.redirect("/events");
  } catch (error) {
    console.error("Error al modificar el evento:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = confirmModifyEvent;
