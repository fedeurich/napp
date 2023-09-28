const express = require("express");
const multer = require("multer");
const path = require("path");

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

const uploadImgUser = multer({ storage });

const {
  getAllUsers,
  getUserById,
  formNewUser,
  postNewUser,
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
router.post("/users", uploadImgUser.single("image"), postNewUser);

//Ruta para borrar un usuario
// router.delete
module.exports = router;
