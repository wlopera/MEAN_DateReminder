/**
 *  CRUD: Crear, consultar, modificar y borrar notas de recordatorios de la BD - Mongo
 * 
 * @autor: William Lopera
 * @date:   Junio 2019 
 */


// Acceso al modelo 
const Reminder = require('./model/reminder');

/**
 * Funcion: Consultar todas las notas de recordatorios en base de datos
 * 
 * @autor: William Lopera
 * @date:  Junio 2019
 */
function getReminders(req, res) {
    console.log("Inicio getReminders controller.js");
    Reminder.find(function (err, reminder) {
        if (err) {
            console.log("##=> Error consultando recordatorios: %o", err);
            return res.send("Error consultando recordatorios" + err);
        }

        var date = reminder.day + '/' + reminder.month + '/' +reminder.year;
        var note = {
            date   : date,              // Fecha
            to     : reminder.to,       // Remitente
            note   : reminder.note,     // Mensaje 
            status : reminder.status,   // 0 = en espera / 1 = por enviar / 2 = enviada
            active : reminder.active,   // 0 = inactiva / 1 = activa
            total  : reminder.total     // Veces enviada
        }

        console.log("Fin getReminders controller.js");
        res.json(note);
    });
}; 

/**
 * Funcion: Guardar nota de recordatorio en base de datos
 * 
 * @autor: William Lopera
 * @date:  Junio 2019
 */
function setReminder(req, res) {

    console.log("Inicio setReminder controller.js");

    var date = req.body.data.split("/");

    var note = {
        day    : date[0],           // Dia del evento
        month  : date[1],           // Mes del evento
        year   : date[2],           // Annio del evento
        to     : req.body.to,       // Remitente
        note   : req.body.note,     // Mensaje 
        status : '0',               // 0 = en espera / 1 = por enviar / 2 = enviada
        active : true,              // 0 = inactiva / 1 = activa
        total  : 0                  // Veces enviada
    }

	Reminder.create(
		note,
		function(err, reminder) {
			if (err) {
				console.log("##=> Error guardando recordatorio: %o", err);
				return res.send("Error guardando recordatorio: " + err);
            }
            console.log("Fin setReminder controller.js");
			// Consulta y devuelve todas las notas de recoratorio, luego de crear una nueva nota
			getReminders(req, res);
		}
	);
}

// Exportar servicios
module.exports = {
	getReminders,
	setReminder
}