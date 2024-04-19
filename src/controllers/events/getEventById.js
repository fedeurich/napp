const { Event, CateringType, Client, Product, Employee } = require("../../database/models");
const path = require("path");

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: CateringType,
          as: "CateringType",
          attributes: ["IDCateringType", "NameCateringType", "EmployeesRequired", "ProductsRequired"],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["IDClient", "FirstName", "LastName", "Email", "Tel", "Image"],
        },
        {
          model: Product,
          as: "Product",
          attributes: ["IDProduct", "NameProduct", "Price", "Stock", "Image"],
        },
        {
          model: Employee,
          as: "Employee",
          attributes: ["IDEmployee", "IDRole", "FirstName", "LastName", "Email", "Image", "PaidLeave"],
        },
      ],
    });

    if (!event) {
      return res.render(path.join(__dirname, "../../views/404NotFound"), {
        message: "Event not found",
      });
    }

    const ruta = path.join(__dirname, "../../views/events/eventDetail.ejs");
    res.render(ruta, { event });
  } catch (error) {
    console.error("Error al obtener detalles del evento:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getEventById;
