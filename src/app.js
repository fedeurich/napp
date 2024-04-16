const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const session = require("express-session");
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport-config');

// Agregar cors al middleware
const path = require("path");

const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const employeesRoutes = require("./routes/employeesRoutes.js");
const clientsRoutes = require("./routes/clientsRoutes.js");
const cookies = require("cookie-parser");

const server = express();

const { userLoggedMiddleware } = require("./middlewares/adminMiddlewares.js");

//configuración de session
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
server.use(passport.initialize());
server.use(passport.session());
server.use(userLoggedMiddleware);

server.use(cookies());
server.use(morgan("dev"));
server.set("view engine", "ejs");

//manejar data desde un formulario HTML
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Reconoce put o delete
server.use(methodOverride("_method"));

server.use(express.static(path.join(__dirname, "../public")));

server.use(cors());

server.use(mainRoutes);
server.use(userRoutes);
server.use(productsRoutes);
server.use(employeesRoutes);
server.use(clientsRoutes);

//Ruta 404
server.use((req, res, next) => {
  const ruta = path.join(__dirname, "./views/404NotFound.ejs");
  res.status(404).render(ruta, { message: "Dirección no encontrada" });
});

module.exports = server;
