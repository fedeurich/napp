const express = require("express");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize, Role, Employee } = require("../database/models");
const { body } = require("express-validator");
const {
  isUser,
  guestMiddleware,
  authMiddleware,
} = require("../middlewares/adminMiddlewares");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/img/employees"));
  },
  filename: (req, file, callback) => {
    const { v4: uuidv4 } = require("uuid");
    callback(
      null,
      `${uuidv4()}_${req.body.firstName}${path.extname(file.originalname)}`
    );
  },
});

const uploadImgEmployee = multer({ storage: storage });

// Validaciones
const validationsForm = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar un nombre")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar un nombre válido")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Tiene que tener entre 5 y 20 caracteres"),

    body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar apellido")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar un nombre válido")
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage("Tiene que tener entre 5 y 20 caracteres"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Tienes que ingresar un mail")
    .bail()
    .isEmail()
    .withMessage("Tienes que ingresar un mail valido"),

    body("paidLeave")
    .trim()
    .notEmpty()
    .withMessage("Debe ingresar dia de franco")
    .bail()
    .isString()
    .withMessage("Tienes que ingresar un dia valido válido")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("Tiene que tener entre 5 y 20 caracteres"),

  body("role").notEmpty().withMessage("Debe seleccionar un rol"),

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
  getAllEmployees,
  getEmployeeById,
  formNewEmployee,
  postNewEmployee,
  deleteEmployee,
  confirmModifyEmployee,

} = require("../controllers/employees");



//Ruta para ver todos los empleados
router.get("/employees", getAllEmployees);
router.get("/employee/:id", getEmployeeById);

//Rutas para crear empleados
router.get("/new-employee", isUser, formNewEmployee);
router.post(
  "/employees",
  isUser,
  uploadImgEmployee.single("image"),
  validationsForm,
  postNewEmployee
);

//Ruta editar un empleado
router.put("/employee/:id/edit", isUser, confirmModifyEmployee);

//Ruta borrar un empleado
router.delete("/employees/delete/:id", isUser, deleteEmployee);

// ********* API ROUTES **************
// Obtener todos los empleados
router.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Role,
        as: "Role",
      },
    });

    const countByRole = {};

    // Mapear empleados para incluir solo la información necesaria de Role
    const mappedEmployees = employees.map((employee) => {
      const roleName = employee.Role ? employee.Role.NameRole : "Sin rol";

      const roleInfo = employee.Role
        ? {
            IDRole: employee.Role.IDRole,
            IDType: employee.Role.IDType,
          }
        : null;

      if (!countByRole[roleName]) {
        countByRole[roleName] = {
          count: 1,
          role: roleInfo,
        };
      } else {
        countByRole[roleName].count++;
      }

      // Retornar solo la información necesaria del empleado
      return {
        IDEmployee: employee.IDEmployee,
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        Email: employee.Email,
        PaidLeave: employee.PaidLeave,
        Image: employee.Image,
        Role: roleName, // Cambiar de employee.NameRole a roleName
      };
    });

    const count = employees.length;

    const obj = { count, countByRole, employees: mappedEmployees };
    res.json(obj);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un empleado por ID
router.get("/api/employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error al obtener al empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener el último empleado agregado
router.get("/api/employees/latest", async (req, res) => {
  try {
    const latestEmployee = await Employee.findOne({
      include: {
        model: Role,
        as: "Role",
      },
      order: [['IDEmployee', 'DESC']], // Ordena por IDEmployee de forma descendente para obtener el último
    });

    if (!latestEmployee) {
      return res.status(404).json({ error: "No hay empleados disponibles." });
    }

    // Mapear la información necesaria
    const mappedLatestEmployee = {
      IDEmployee: latestEmployee.IDEmployee,
      FirstName: latestEmployee.FirstName,
      LastName: latestEmployee.LastNamestName,
      Email: latestEmployee.Email,
      PaidLeave: latestEmployee.PaidLeave,
      Image: latestEmployee.Image,
      Role: latestEmployee.Role ? latestEmployee.Role.NameRole : "Sin rol",
    };

    res.json(mappedLatestEmployee);
  } catch (error) {
    console.error("Error al obtener el último empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


module.exports = router;
