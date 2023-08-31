//Traer express
const express = require("express");
//Crear una instancia de express
const app = express();

const path = require("path");

//Defino la ruta de los archivos publicos
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//Puerto en el que corre el servidor
app.listen(3031, () => {
  console.log("El servidor esta corriendo en http://localhost:3031/");
});

//Ruta del index(home)
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/index.html"));
});
