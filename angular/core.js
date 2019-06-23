
var app = angular.module('mainApp', []);

app.controller('mainController', function ($scope, $http) {

	$scope.newReminder = {};
	$scope.reminders = {};
	$scope.selected = false;
	$scope.showSave = false;
	$scope.showUpdate = false;

	// Obtener recordatorios de base de datos
	$http.get('http://localhost:3000/api/reminder')
		.success(function (data) {
			console.log("Consulta BD - core.js -- /api/reminder: ", data);
			$scope.reminders = data;
		})
		.error(function (data, status, headers, config) {
			console.log('##=> Error getReminders - data: %o', data);
			console.log('##=> Error getReminders - status: %o', status);
			console.log('##=> Error getReminders - headers: %o', headers);
			console.log('##=> Error getReminders - config: %o', config);
		});

	// Crear un recordatorio en BD
	$scope.createReminder = function () {
		$http.post('http://localhost:3000/api/reminder', $scope.newReminder)
			.success(function (data) {
				$scope.newReminder = {};    // Borramos los datos iniciales del formulario
				$scope.reminders = data;    // Pasamos los valores a la vista
			})
			.error(function (data) {
				console.log('Error createReminder: ', data);
			});
	};

	// Actualizar un recordatorio en BD
	$scope.updateReminder = function () {
		$http.put('http://localhost:3000/api/reminder', $scope.newReminder)
			.success(function (data) {
				$scope.newReminder = {};    // Borramos los datos iniciales del formulario
				$scope.reminders = data;    // Pasamos los valores a la vista
			})
			.error(function (data) {
				console.log('Error updateReminder: ', data);
			});

	};

	// Funcion que borra un objeto nota por su id
	$scope.deleteReminder = function(reminder) {
		$http.delete('http://localhost:3000/api/reminder/' + reminder.id)
		.success(function(data) {
			$scope.newReminder = {};
			$scope.reminders = data;
		})
		.error(function(data) {
			console.log('Error deleteReminder: ', data);
		});
	};

	// Seleccionar recordatorio de la vista (tabla)
	$scope.selectReminder = function (reminder) {
		$scope.newReminder = angular.copy(reminder);
		$scope.selected = true;
		console.log("Recordatorio seleccionado: ", $scope.newReminder);
	};

	// Limpiar la entrada de datos
	$scope.clear = function () {
		$scope.newReminder = {};
	};

	$scope.setShowSave = function() {
		$scope.showSave = true;	
		$scope.showUpdate = false;
	}

	$scope.setShowUpdate = function() {
		$scope.showSave = false;	
		$scope.showUpdate = true;
	}

	$('#addSymbol').on('click', function(){
		
		var myInput = $("#email");
		myInput.val(myInput.val()+"@");
		myInput.trigger('input');
		myInput.focus();
		
	});

	$('#addCom').on('click', function(){
		var myInput = $("#email");
		myInput.val(myInput.val()+".com");
		myInput.trigger('input');
		myInput.focus();
	});


});