var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reminderSchema = new Schema({
    
    day : {type : Number},      // Dia del evento
    month : {type : Number},    // Mes del evento
    year : {type : Number},     // Annio del evento
    to : {type : String},       // Remitente
    note : {type : String},     // Mensaje 
    status : {type : String},   // 0 = en espera / 1 = por enviar / 2 = enviada
    active : {type : Boolean},   // 0 = inactiva / 1 = activa
    total  : {type : Number}    // Veces enviada
}); 

// Crear esquema y asignarla al modelo
var Reminder = mongoose.model('Reminder', reminderSchema);

// Activar el esquema
module.exports = Reminder;