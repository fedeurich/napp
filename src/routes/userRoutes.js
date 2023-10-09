const express = require("express");
const multer = require("multer");
const path = require("path");
const isUser = require("../middlewares/adminMiddlewares");
const { body } = require("express-validator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/users"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_avatar${req.body.lastName}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgUser = multer({ storage: storage });

const validationsUsers = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar un nombre")
    .bail()
    .isLength({ min: 2, max: 10 })
    .withMessage("Tiene que tener entre 2 y 10 caracteres"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar un apellido")
    .bail()
    .isLength({ min: 2, max: 10 })
    .withMessage("Tiene que tener entre 2 y 10 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar un mail")
    .bail()
    .isEmail()
    .withMessage("Tienes que ingresar un mail valido"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar una contraseña")
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage("Tiene que tener entre 6 y 16 caracteres"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
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
  getAllUsers,
  getUserById,
  formNewUser,
  postNewUser,
  deleteUser
} = require("../controllers/users");

//Ruta del register
router.get("/register", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/users/register.ejs");
  res.render(ruta);
});

//Ruta del login
router.get("/login", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/users/login.ejs");
  res.render(ruta);
});

//Ruta para ver todos los usuarios
router.get("/users", getAllUsers);

//Rutas para crear usuario
router.get("/new-user", formNewUser);
router.post(
  "/users",
  uploadImgUser.single("image"),
  validationsUsers,
  postNewUser
);

//Ruta para borrar un usuario
router.delete("/users/delete/:id", isUser, deleteUser);

//Ruta para buscar por ID
router.get("/users/:id", getUserById);

module.exports = router;
