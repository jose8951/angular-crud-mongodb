var express = require("express");
var server = express();
var routes = require("./routes/routes");
var mongoose = require("mongoose");
const cors = require("cors");

//funcion para conectar a mongoDB
async function conectarDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/est");
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
  }
}

conectarDB();

//Middleware para Análisis de Solicitudes JSON:
server.use(cors());
server.use(express.json());
server.use(routes);


// Iniciar el servidor
server.listen(3000, function check(error) {
  if (error) {
    console.log("error");
  } else {
    console.log("Servidor iniciado en el puerto 3000");
  }
});

//mongod
//escribimos en el terminals >node server.js
