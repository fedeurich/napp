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
  body("addressEvent"),
  body('addressEvent').notEmpty().withMessage('La dirección es obligatoria'),
  body('dateEvent').isISO8601().withMessage('Fecha inválida'),
  body('cateringType').isInt().withMessage('Debe seleccionar un tipo de catering válido'),
  body('client').isInt().withMessage('Debe seleccionar un cliente válido'),
  body('productsArrayJSON').notEmpty().withMessage('Debe seleccionar al menos un producto'),
  body('employees').isInt().withMessage('Debe seleccionar al menos un empleado')
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

//Rutas para crear eventos
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