const { validationResult } = require("express-validator");
const { Event, CateringType, Client, Product, Employee } = require("../../database/models");

const postNewEvent = async (req, res) => {
  console.log("Datos del formulario 1:", req.body);
  const errors = validationResult(req);

  try {
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { addressEvent, dateEvent, cateringType, client, products, productsArrayJSON, employees } = req.body;
    console.log("entro", req.body);

    if (!cateringType || !client || !productsArrayJSON || !employees) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Convertir el array productsArrayJSON a un array JavaScript
    const productsArray = JSON.parse(productsArrayJSON);

    const event = {
      AddressEvent: addressEvent,
      DateEvent: new Date(dateEvent),
      IDCateringType: parseInt(cateringType),
      IDClient: parseInt(client),
      ProductsArray: JSON.stringify(productsArray), // Convertir array a cadena JSON
      IDEmployee: parseInt(employees),
    };

    console.log("hola", event);

    const newEvent = await Event.create(event);

    console.log("Evento creado:", newEvent);

    res.redirect("/events");
  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewEvent;
