const express = require("express");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize, CateringType } = require("../database/models");
const { body } = require("express-validator");
const {
  isUser,
} = require("../middlewares/adminMiddlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/cateringTypes"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_${req.body.nameCateringType}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgCateringType = multer({ storage: storage });

// Validaciones
const validationsForm = [
  body("nameCateringType")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .isString()
    .withMessage("Tienes que ingresar un nombre válido")
    .isLength({ min: 3, max: 20 })
    .withMessage("Tiene que tener entre 3 y 20 caracteres"),

  body("employeesRequired")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un número de empleados")
    .isNumeric()
    .withMessage("Tienes que ingresar un número")
    .isLength({ min: 1, max: 20 })
    .withMessage("Tiene que tener entre 1 y 20 caracteres"),

    body("productsRequired")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un número de empleados")
    .isNumeric()
    .withMessage("Tienes que ingresar un número")
    .isLength({ min: 1, max: 20 })
    .withMessage("Tiene que tener entre 1 y 20 caracteres"),

];

const {
  getAllCateringTypes,
  getCateringTypeById,
  formNewCateringType,
  postNewCateringType,
  deleteCateringType,
  confirmModifyCateringType,
} = require("../controllers/cateringTypes");


// Ruta para ver todos los tipos de categoria
router.get("/cateringTypes", getAllCateringTypes);
router.get("/cateringType/:id", getCateringTypeById);

// Rutas para crear tipos de catering
router.get("/new-cateringType", isUser, formNewCateringType);
router.post(
  "/cateringTypes",
  isUser,
  uploadImgCateringType.single("image"),
  validationsForm,
  postNewCateringType
);

// Ruta editar un tipo de catering
router.put("/cateringType/:id/edit", isUser, confirmModifyCateringType);

// Ruta borrar un tipo de catering
router.delete("/cateringType/delete/:id", isUser, deleteCateringType);

module.exports= router