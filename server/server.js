/**
 * Servidor JS
 * 
 * Servicios:
 *  - Envio correos via SMTP - nodemailer
 *  - CRUD de informacion de recordatorios - mongo
 *
 * @autor: william Lopera
 * @date:  Junio 2019
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

const path = require('path');
const http = require('http');
const logger = require('morgan');

const app = express();

// Configuracion
mongoose.connect('mongodb://localhost:27017/reminder', { useNewUrlParser: true });     // Conexion a la base de datos Mongo -> "reminder"

app.use(express.static(path.join(__dirname, '/angular')));
app.use(logger('dev'));            // activamos el log en modo 'dev'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Carga de endpoints
require('../app/route.js')(app);

// Ambiente
if ('development' == app.get('env')) {
 	console.log("Enpoints DEV")
}

var server = http.createServer(app);

app.listen(prop.get('server.port'), () => {
    console.log(prop.get('server.message'));
});

// app.get("/", function(Req, res){
//     res.send(prop.get('messages.welcome'))
// });
