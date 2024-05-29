const { validationResult } = require("express-validator");
const { Event, CateringType, Client } = require("../../database/models");
const path = require("path");

const postNewEvent = async (req, res) => {
  console.log("Datos del formulario 1:", req.body);
  const errors = validationResult(req);

  try {
    const cateringTypes = await CateringType.findAll();
    const clients = await Client.findAll();
    
    console.log(errors);

    if (errors.isEmpty()) {
      const { addressEvent, dateEvent, cateringType, client, products, employees } = req.body;
      console.log({ addressEvent, dateEvent, cateringType, client, products, employees });

      if (!cateringType || !client || !products || !employees) {
        return res.status(400).json({ error: "CateringType, Client, Products, or Employees missing" });
      }

      const event = {
        AddressEvent: addressEvent,
        DateEvent: new Date(dateEvent),
        IDCateringType: parseInt(cateringType),
        IDClient: parseInt(client),
        IDProduct: parseInt(products),
        IDEmployee: parseInt(employees),
      };

      console.log(event);

      const newEvent = await Event.create(event);

      console.log("Evento creado:", newEvent);
      res.redirect("/events");

    } else {
      const ruta = path.join(__dirname, "../../views/events/newEvent.ejs");
      res.render(ruta, {
        cateringTypes,
        clients,
        errors: errors.mapped(),
        oldData: req.body,
      });
    }

  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewEvent;
