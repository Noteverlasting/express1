const express = require('express');
const server = express();
const util = require('node:util');

// Le vamos a indicar que la constante puerto la lea desde el archivo .env con process. Si no hubiese puerto definido en .env, será el 30000
process.loadEnvFile()
const PUERTO = process.env.PUERTO || 30000;

// asi pedimos al servidor.
// En los parentesis, el primer parámetro es el path y el segundo es el método.
server.get("/", (req, res) => {
    console.log(util.styleText("green","Conectados a HOME"));
    // res.send indica a la respuesta que envie algo
    res.send("<h1>Estamos en la ruta raíz o home</h1>")

})

server.get("/clientes", (req, res) => {
    // res.send indica a la respuesta que envie algo
    res.send("Estamos en la ruta clientes")

})

server.get("/api/cliente", (req, res) => {
    res.json({"nombre": "James", "apellido": "Pond", "edad": 30})
})

// ULTIMA RUTA - ésta es la ultima ruta que se leera, con lo cual vamos a poner el error de No encontrada, ya que no es ninguno de los casos anteriores
server.use((req, res) => {
    res.status(404).send('Página no encontrada')

})


// Con listen, le pedimos al server que nos confirme que está funcionando.
server.listen(PUERTO, () =>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})