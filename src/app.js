const express = require("express");
const morgan = require("morgan");
const path = require("path");

const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");

const server = express();

server.use(morgan("dev"));
server.set("view engine", "ejs");

server.use(express.static(path.join(__dirname, "../public")));

server.use(mainRoutes);
server.use(userRoutes);
server.use(productsRoutes);

module.exports = server;
