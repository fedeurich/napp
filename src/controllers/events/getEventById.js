const { Event, CateringType, Client, Product, Employee } = require("../../database/models");
const path = require("path");

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId, {
      attributes: ['IDEvent', 'AddressEvent', 'DateEvent', 'ProductsArray'], // Incluir ProductsArray en los atributos
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
    
    // Convertir la cadena JSON a un array si ProductsArray está definido
    const productsArray = event.ProductsArray ? JSON.parse(event.ProductsArray) : [];
    
    // Consultar los nombres de los productos correspondientes a los IDs en productsArray
    const products = await Product.findAll({
      where: { IDProduct: productsArray },
      attributes: ['IDProduct', 'NameProduct'], // Solo necesitamos los IDs y nombres de los productos
    });

    const ruta = path.join(__dirname, "../../views/events/eventDetail.ejs");
    res.render(ruta, { event, products });
  } catch (error) {
    console.error("Error al obtener detalles del evento:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getEventById;
