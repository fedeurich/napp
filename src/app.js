// En el inicio es donde se importan los módulos necesarios y se configuran los middleware y las rutas
// Express, para crear el servidor web
const express = require("express");

// Morgan, para el registro de solicitudes HTTP
const morgan = require("morgan");

// Method-Override, para sobrescribir métodos HTTP
const methodOverride = require("method-override");

// Express-session, para la gestión de sesiones
const session = require("express-session");

// Cors, para habilitar el intercambio de recursos de origen cruzado
const cors = require('cors');

// Passport, para la autenticación de usuarios
const passport = require('passport');
const passportConfig = require('./passport-config');

// Path, utilidades para trabajar con rutas de archivos y directorios
const path = require("path");

// Se importan las rutas de la aplicación para organizar el código de manera modular
const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const employeesRoutes = require("./routes/employeesRoutes.js");
const clientsRoutes = require("./routes/clientsRoutes.js");
const cateringTypesRoutes = require("./routes/cateringTypesRoutes.js");
const eventsRoutes = require("./routes/eventsRoutes.js");

// Para analizar las cookies HTTP
const cookies = require("cookie-parser");

// Se crea una instancia de Express
const server = express();

// Middleware para la gestión de usuarios
const { userLoggedMiddleware } = require("./middlewares/adminMiddlewares.js");

// CONFIGURACION DE SESSION
// Se especifica un 'secret' para firmar la cookie de sesión (hash)
//  Se desactiva la opción de volver a guardar 'resave'
//   También la opción de guardar sin inicializar 'saveUninitialized'
//  Se establece la duración máxima de la cookie de sesión 'maxAge' en una hora.
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Se inicializa y se configura Passport.js para la autenticación de usuarios
server.use(passport.initialize());
server.use(passport.session());

// Se utiliza el middleware userLoggedMiddleware mencionado anteriormente
server.use(userLoggedMiddleware);

// Se utiliza el 'cookies-parser'
server.use(cookies());

// Se utiliza el middleware morgan con el formato de registro "dev"
//  para registrar las solicitudes HTTP en la consola en un formato legible.
server.use(morgan("dev"));

// Se establece el motor de vistas en "ejs", la aplicación utilizará archivos de plantillas EJS
server.set("view engine", "ejs");

// Manejar data desde un formulario HTML
// Se utiliza el middleware express.urlencoded() y express.json()
//  para analizar los datos enviados desde formularios HTML en las solicitudes POST
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Permite que las solicitudes PUT y DELETE se realicen a través de formularios HTML
server.use(methodOverride("_method"));

// Permite usar archivos estáticos (como CSS, o imágenes)
server.use(express.static(path.join(__dirname, "../public")));

// Permite que el servidor acepte solicitudes desde dominios diferentes
server.use(cors());

// Permite que las solicitudes entrantes sean dirigidas a las rutas correspondientes
server.use(mainRoutes);
server.use(userRoutes);
server.use(productsRoutes);
server.use(employeesRoutes);
server.use(clientsRoutes);
server.use(cateringTypesRoutes);
server.use(eventsRoutes);


// Ruta 404
// server.use() captura todas las solicitudes que no coinciden con ninguna otra ruta definida anteriormente
// utilizando path.join() se asegura de que la ruta sea válida en cualquier sistema operativo
// se utiliza res.render() para renderizar la plantilla EJS de la página de error 404
server.use((req, res, next) => {
  const ruta = path.join(__dirname, "./views/404NotFound.ejs");
  res.status(404).render(ruta, { message: "Dirección no encontrada" });
});

module.exports = server;