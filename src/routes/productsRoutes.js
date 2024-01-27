const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  isUser,
  guestMiddleware,
  authMiddleware,
} = require("../middlewares/adminMiddlewares");
const { Op } = require("sequelize");
const { sequelize, Category, Product } = require("../database/models");
const { body } = require("express-validator");

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

// Validaciones
const validationsForm = [
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar un nombre valido")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("Tiene que tener entre 5 y 20 caracteres"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .bail()
    .isNumeric()
    .withMessage("Debe ingresar un numero"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar una descripcion")
    .bail()
    .isString()
    .withMessage("Tiene que ser un texto")
    .bail()
    .isLength({ max: 40 })
    .withMessage("No puede ser mayo a 40"),
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
  getAllProducts,
  getProductById,
  formNewProduct,
  postNewProduct,
  deleteProduct,
  confirmModifyProduct,
} = require("../controllers/products");

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
router.get("/product/:id", getProductById);

//Rutas para crear productos
router.get("/new-product", isUser, formNewProduct);
router.post(
  "/products",
  isUser,
  uploadImgProduct.single("image"),
  validationsForm,
  postNewProduct
);

//Ruta editar un producto
router.put("/product/:id/edit", isUser, confirmModifyProduct);

//Ruta borrar un producto
router.delete("/product/delete/:id", isUser, deleteProduct);

// ********* API ROUTES **************
// Obtener todos los productos
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "Category", // Cambiado a "Category" en lugar de "products"
          attributes: ["IDCategory", "NameCategory"],
        },
      ],
    });

    const mappedProducts = products.map((product) => ({
      id: product.IDProduct,
      name: product.NameProduct,
      description: product.DescriptionProduct,
      categories: product.Category
        ? [
            {
              id: product.Category.IDCategory,
              name: product.Category.NameCategory,
            },
          ]
        : [],
      detail: `/api/products/${product.IDProduct}`,
    }));

    const categoryCounts = await Category.findAll({
      attributes: [
        "NameCategory",
        [
          sequelize.fn("COUNT", sequelize.col("products.IDProduct")),
          "productCount",
        ],
      ],
      include: {
        model: Product,
        as: "products",
        attributes: [],
      },
      group: ["NameCategory"],
    });

    const countByCategory = {};
    categoryCounts.forEach((category) => {
      countByCategory[category.NameCategory] = category.get("productCount");
    });

    const count = products.length;

    const obj = { count, countByCategory, products: mappedProducts };
    res.json(obj);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un producto por ID
router.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
