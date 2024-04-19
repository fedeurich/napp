const express = require("express");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
const {
  Event,
  CateringType,
  Client,
  Product,
  Employee,
} = require("../database/models");
const { body } = require("express-validator");
const {
    
  isUser,
} = require("../middlewares/adminMiddlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/events"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_${req.body.firstName}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgEvent = multer({ storage: storage });

// Validaciones
const validationsForm = [
  body("addressEvent")
    .trim()
    .notEmpty()
    .withMessage("La dirección del evento es requerida")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar un nombre válido")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Tiene que tener entre 5 y 50 caracteres"),

    body("dateEvent")
    .trim()
    .notEmpty()
    .withMessage("La fecha del evento es requerida")
    .bail()
    .isDate(),

    body("cateringType")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar una catering")
    .bail()
    .isNumeric()
    .withMessage("El tipo de catering es requerido"),

    body("client")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un cliente")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar cliente valido")
    .bail()
    .isLength({ min: 1, max: 20 })
    .withMessage("Tiene que tener entre 1 y 20 caracteres"),
    body("products").isArray({ min: 1 }).withMessage("Debe seleccionar al menos un producto"),
    body("employees").isArray({ min: 1 }).withMessage("Debe seleccionar al menos un empleado"),

];

const {
    getAllEvents,
    getEventById,
    formNewEvent,
    postNewEvent,
    deleteEvent,
    confirmModifyEvent,
  } = require("../controllers/events");



//Ruta para ver todos los eventos
router.get("/events", getAllEvents);
router.get("/", getAllEvents);
router.get("/events/:id", getEventById);

//Rutas para crear empleados
router.get("/new-event", isUser, formNewEvent);

router.post(
  "/events",
  isUser,
  uploadImgEvent.single("image"),
  validationsForm,
  postNewEvent
);

//Ruta editar un evento
router.put("/event/:id/edit", isUser, confirmModifyEvent);

//Ruta borrar un evento
router.delete("/events/delete/:id", isUser, deleteEvent);



module.exports = router;
