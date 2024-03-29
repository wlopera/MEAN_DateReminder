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

    // console.log("Inicio getReminders controller.js");
    
    Reminder.find(function (err, reminder) {
        if (err) {
            console.log("##=> Error consultando recordatorios: %o", err);
            return res.send("Error consultando recordatorios" + err);
        }

        // console.log("##=> Consultar - reminder: %o", reminder);

        var notes = [];

        for (i in reminder) {
            var date = reminder[i].day + '/' + reminder[i].month + '/' +reminder[i].year;
            var note = {
                id     : reminder[i]._id,      // Identificador de la nota
                date   : date,                 // Fecha
                to     : reminder[i].to,       // Remitente
                note   : reminder[i].note,     // Mensaje 
                status : reminder[i].status,   // 0 = en espera / 1 = por enviar / 2 = enviada
                active : reminder[i].active,   // 0 = inactiva / 1 = activa
                total  : reminder[i].total     // Veces enviada
            }
            notes.push(note);
        }

        // console.log("##=> Consultar - note: %o", notes);

        // console.log("Fin getReminders controller.js");

        res.json(notes);
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
     console.log("##=> Agregar - req.body: %o", req.body);

    var date = req.body.date.split("/");

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
            // console.log("Fin setReminder controller.js");
			// Consulta y devuelve todas las notas de recoratorio, luego de crear una nueva nota
			getReminders(req, res);
		}
	);
}

/**
 * Funcion: Actualizar nota de recordatorio en base de datos
 * 
 * @autor: William Lopera
 * @date:  Junio 2019
 */
function updateReminder(req, res){

    console.log("Inicio updateReminder controller.js");
    console.log("##=> Modificar - req.body: %o", req.body);

    var date = req.body.date.split("/");

    var note = {
        id     : req.body.id,       // Identificador
        day    : date[0],           // Dia del evento
        month  : date[1],           // Mes del evento
        year   : date[2],           // Annio del evento
        to     : req.body.to,       // Remitente
        note   : req.body.note,     // Mensaje 
        status : '0',               // 0 = en espera / 1 = por enviar / 2 = enviada
        active : true,              // 0 = inactiva / 1 = activa
        total  : 0                  // Veces enviada
    }

	Reminder.update( 
		{_id : note.id},
		{ $set:
			{
				day : note.day,
				month: note.month, 
				year: note.year,
                to: note.to,
                note: note.note,
                status: note.status,
                active: note.active,
                total: note.total, 
			}
		},
		function(err, reminder) {
			if (err) {
				console.log("##=> Error modificando factura: %o", err);
				res.send(err);
			}
			// Obtiene y devuelve todas las notas tras borrar una de ellas
		    getReminders(req, res);
		}
	);
};


/**
 * Funcion: Eliminar nota de recordatorio en base de datos
 * 
 * @autor: William Lopera
 * @date:  Junio 2019
 */
function removeReminder (req, res) {
   
    console.log("removeReminder: %o", req.params);

	Reminder.remove({_id : req.params.reminderId}, function(err, reminder) {
		if (err) {
            console.log("##=> Error eliminando recordatorio: %o", err);
            res.send(err);
        }
		// Obtiene y devuelve todas las notas tras borrar una de ellas
		getReminders(req, res);
	});
}
// Exportar servicios
module.exports = {
	getReminders,
    setReminder,
    updateReminder,
    removeReminder
}