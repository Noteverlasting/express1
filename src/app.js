// DEPENDENCIAS DEL PROYECTO
const path = require("node:path");
const express = require("express");
const morgan = require("morgan");
const server = express();
// const util = require("node:util");
const fs = require("node:fs");
require('dotenv').config();


// LECTURA DEL FICHERO CON LAS VISITAS ACTUALIZADAS
const visitasJSON = require("../visitas.json");
let visitas = visitasJSON["visitas"];

// Le vamos a indicar que la constante puerto la lea desde el archivo .env con process. Si no hubiese puerto definido en .env, será el 30000
process.loadEnvFile()
const PUERTO = process.env.PUERTO || 30000;

// Debemos indicarle a express que use la ruta de fichero estatico que hemos creado
server.use(express.static(path.join(__dirname, '../public')))

// Middleware de librería
// server.use(morgan("dev"));
// Middleware personalizado
server.use((req, res, next) => {
  visitas++;
  let objetoVisitas = `{"visitas": ${visitas}}`;
  fs.writeFileSync("visitas.json", objetoVisitas, (err) => {
    if (err) throw err;
    console.log("Fichero actualizado");
  });
  next();
});


// asi pedimos al servidor.
// En los parentesis, el primer parámetro es el path y el segundo es el método.
server.get("/", (req, res) => {
    console.log(util.styleText("green","Conectados a HOME"));
    // clg para mostrar por consola el directorio en el que se encuentra el archivo de origen
    console.log(util.styleText("blue", __dirname));
    let mensaje = "<h1>Estamos en la ruta raiz o home</h1>";
    mensaje += `Total visitas: ${visitas}`;
    // res.send indica a la respuesta que envie algo  
    res.send(mensaje);
})

server.get("/clientes", (req, res) => {
  let mensaje = "<h1>Estamos en la ruta clientes</h1>";
  mensaje += `Total visitas: ${visitas}`;
  res.send(mensaje);
});

server.get("/api/cliente", (req, res) => {
    res.json({"nombre": "James", "apellido": "Pond", "edad": 30})
})

server.get("/james", (req, res) => {
    // vamos a enviar un archivo al acceder a la ruta /james. Para lo cual debemos indicar TAMBIEN donde está el directorio raiz
    res.sendFile(path.join(__dirname, '../public/james.html'));
})


// ULTIMA RUTA - ésta es la ultima ruta que se leera, con lo cual vamos a poner el error de No encontrada, ya que no es ninguno de los casos anteriores
server.use((req, res) => {
    res.status(404).send('Página no encontrada')

})


// Con listen, le pedimos al server que nos confirme que está funcionando.
server.listen(PUERTO, () =>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})