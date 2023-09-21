const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");

const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");

const server = express();

server.use(morgan("dev"));
server.set("view engine", "ejs");

//manejar data desde un formulario HTML
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Reconoce put o delete
server.use(methodOverride("_method"));

server.use(express.static(path.join(__dirname, "../public")));

server.use(mainRoutes);
server.use(userRoutes);
server.use(productsRoutes);

module.exports = server;
