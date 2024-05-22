const { validationResult } = require("express-validator");
const { Event, CateringType, Client, Product, Employee } = require("../../database/models");
const path = require("path");

const postNewEvent = async (req, res) => {
  console.log("Datos del formulario 1:", req.body);
  const errors = validationResult(req);

  try {
    const cateringTypes = await CateringType.findAll();
    const clients = await Client.findAll();
    //const products = await Product.findAll();
    //const employees = await Employee.findAll();
    
    console.log(errors)
    if (errors.isEmpty()) {
      console.log({addressEvent, dateEvent, cateringType, client, product, employee})
      if (!cateringType || !client || !product || !employee)  {
        return res
          .status(400)
          .json({error: "CateringType" });
      }
    }

      console.log(req.body)
      const { addressEvent, dateEvent, cateringType, client, products, employees } = req.body
      const event = {
        AddressEvent: addressEvent,
        DateEvent: new Date(dateEvent),
        IDCateringType: parseInt(cateringType),
        IDClient: parseFloat(client),
        IDProduct: parseInt(products),
        IDEmployee: parseInt(employees),
      }
      
      console.log(event);

      const newEvent = await Event.create(event);

      console.log("Evento creado:", newEvent);
      res.redirect("/events");

    /* } else {

      const ruta = path.join(__dirname, "../../views/events/newEvent.ejs");
      res.render(ruta, {
        cateringTypes,
        clients,
        products,
        employees,
        errors: errors.mapped(),
        oldData: req.body,
      });

    }*/

  } catch (error) {
    console.error("Error al manejar el formulario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = postNewEvent;
