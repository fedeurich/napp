const path = require("path");
const {CateringType, Employee, Product, Client} = require("../../database/models");

const formNewEvent = async (req, res) => {

    const employees = await Employee.findAll();
    const cateringTypes = await CateringType.findAll();
    const clients = await Client.findAll(); 
    const products = await Product.findAll();

    const form = path.join(__dirname, "../../views/events/newEvent.ejs");

    res.render(form, {cateringTypes, employees, products, clients});

  }


module.exports = formNewEvent;