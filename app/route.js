/**
 * Permite llamar los servicios CRUD - NoteJS desde el aplicativo (angular)
 * 
 * @autor: william Lopera
 * @date:  Junio 2019
 */

var Reminder = require('./model/reminder');
var Controller = require('./controller');

module.exports = function (app) {

	// Consultar las notas de recordatorio
	app.get('/api/reminder', Controller.getReminders);

	// Crear una nueva nota de recordatorio
	app.post('/api/reminder', Controller.setReminder);

	// Modificar los datos de una nota
	app.put('/api/reminder', Controller.updateReminder);

	// Borrar nota de recordatorio
	app.delete('/api/reminder/:reminderId', Controller.removeReminder);

	// Aplicacion - carga vista inicial
	app.get('*', function (req, res) {
		res.sendfile('./angular/index.html');
	});

};
