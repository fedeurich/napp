const express = require("express");
const multer = require("multer");
const path = require("path");
const { isUser, guestMiddleware } = require("../middlewares/adminMiddlewares");
const { sequelize, Category, Product } = require('../database/models');
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
router.put("/product/:id/edit", confirmModifyProduct);
//Ruta borrar un producto
router.delete("/product/delete/:id", isUser, deleteProduct);


// ********* API ROUTES **************

// Obtener todos los productos

router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: 'category', // Incluye la asociación con la categoría
    });

    const countByCategory = {}; // Cambiado el nombre de la variable

    products.forEach(product => {
      const categoryName = product.category ? product.category.NameCategory : 'Sin categoría';

      // Agregamos "IDCategory" e "IDType" al objeto "category"
      const categoryInfo = product.category ? {
        IDCategory: product.category.IDCategory,
        IDType: product.category.IDType,
      } : null;

      if (!countByCategory[categoryName]) {
        countByCategory[categoryName] = {
          count: 1,
          category: categoryInfo,
        };
      } else {
        countByCategory[categoryName].count++;
      }
    });

    const count = products.length;

    const obj = { count, countByCategory, products };

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

// Crear un nuevo producto
router.post("/api/products", async (req, res) => {
  const { IDProduct, IDCategory, IDType, NameProduct, Price, DescriptionProduct, Image } = req.body;

  try {
    const newProduct = await Product.create({
      IDProduct,
      IDCategory,
      IDType,
      NameProduct,
      Price,
      Image,
      DescriptionProduct,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear un nuevo producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un producto por ID
router.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizar propiedades del producto según sea necesario
    product.IDCategory = req.body.IDCategory || product.IDCategory;
    product.IDType = req.body.IDType || product.IDType;
    product.NameProduct = req.body.NameProduct || product.NameProduct;
    product.Price = req.body.Price || product.Price;
    product.DescriptionProduct = req.body.DescriptionProduct || product.DescriptionProduct;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un producto por ID
router.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;

