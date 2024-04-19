const express = require("express");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize, Client } = require("../database/models");
const { body } = require("express-validator");
const {
  isUser,
} = require("../middlewares/adminMiddlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/clients"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_${req.body.firstName}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgClient = multer({ storage: storage });

// Validaciones
const validationsForm = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .isString()
    .withMessage("Tienes que ingresar un nombre válido")
    .isLength({ min: 3, max: 20 })
    .withMessage("Tiene que tener entre 3 y 20 caracteres"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar apellido")
    .isString()
    .withMessage("Tienes que ingresar un apellido válido")
    .isLength({ min: 2, max: 20 })
    .withMessage("Tiene que tener entre 2 y 20 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar un correo electrónico")
    .isEmail()
    .withMessage("Tienes que ingresar un correo electrónico válido"),

  body("tel")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un número de teléfono")
    .isNumeric()
    .withMessage("Tienes que ingresar un número")
    .isLength({ min: 1, max: 20 })
    .withMessage("Tiene que tener entre 1 y 20 caracteres"),

  body("image").custom((value, { req }) => {
    let file = req.file;
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      const acceptedExtensions = [".jpg", ".png"];
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivos permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  }),
];

const {
  getAllClients,
  getClientById,
  formNewClient,
  postNewClient,
  deleteClient,
  confirmModifyClient,
} = require("../controllers/clients");


// Ruta para ver todos los clientes
router.get("/clients", getAllClients);
router.get("/client/:id", getClientById);

// Rutas para crear clientes
router.get("/new-client", isUser, formNewClient);
router.post(
  "/clients",
  isUser,
  uploadImgClient.single("image"),
  validationsForm,
  postNewClient
);

// Ruta editar un cliente
router.put("/client/:id/edit", isUser, confirmModifyClient);

// Ruta borrar un cliente
router.delete("/client/delete/:id", isUser, deleteClient);

module.exports= router;