const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const session = require("express-session");

const path = require("path");

const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const cookieParser = require("cookie-parser");

const server = express();

server.use(morgan("dev"));
server.set("view engine", "ejs");

//manejar data desde un formulario HTML
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Reconoce put o delete
server.use(methodOverride("_method"));

server.use(cookieParser());
server.use(express.static(path.join(__dirname, "../public")));

//configuración de session
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(mainRoutes);
server.use(userRoutes);
server.use(productsRoutes);

//Ruta 404
server.use((req, res, next) => {
  const ruta = path.join(__dirname, "./views/404NotFound.ejs");
  res.status(404).render(ruta, { message: "Dirección no encontrada" });
});

module.exports = server;
