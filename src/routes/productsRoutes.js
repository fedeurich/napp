const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/products"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_${req.body.productName}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgProduct = multer({ storage: storage });

const {
  getAllProducts,
  getPeroductById,
  formNewProduct,
  postNewProduct,
  deleteProduct,
} = require("../controllers/products");
const { callbackify } = require("util");

//Ruta del carrito de compra
router.get("/productCart", (req, res) => {
  const ruta = path.join(__dirname, "../views/products/productCart.ejs");
  res.render(ruta);
});

//Ruta del menu de porductos
router.get("/productMenu", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/products/productMenu.ejs");
  res.render(ruta);
});

//Ruta del detalle del producto
router.get("/productDetail", (req, res) => {
  const ruta = path.resolve(__dirname, "../views/products/productDetail.ejs");
  res.render(ruta);
});

//Ruta para ver todos los productos
router.get("/products", getAllProducts);

//Rutas para crear productos
router.get("/new-product", formNewProduct);
router.post("/products", uploadImgProduct.single("image"), postNewProduct);

//Ruta borrar un archivo
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
