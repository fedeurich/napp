// Esto importa el módulo app desde el directorio src donde se configuró la aplicación Express
const server = require("./src/app");

//Se define el puerto en el que el servidor escuchará las solicitudes entrantes
const PORT = process.env.PORT || 3001;

// Puerto en el que corre el servidor, listen es un método del framework Express
server.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});