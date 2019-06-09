angular.module('App', [])
    .controller('Controller', function ($scope, $http) {
    $scope.newReminder = {};
	$scope.reminders = {};
	$scope.selected = false;

	// Obtener recordatorios de base de datos
	$http.get('/api/reminder')
		.success(function(data) {
			console.log("Consulta BD - core.js -- /api/reminder: ", data);
			$scope.reminders = data;
		})
		.error(function(data, status, headers, config) {
			console.log('##=> Error getReminders - data: %o', data);
			console.log('##=> Error getReminders - status: %o', status);
			console.log('##=> Error getReminders - headers: %o', headers);
			console.log('##=> Error getReminders - config: %o', config);
	});

	// Registrar un recordatorio en BD
	$scope.createReminder = function() {
		$http.post('/api/reminder', $scope.newReminder)
		.success(function(data) {
			$scope.newReminder = {};    // Borramos los datos iniciales del formulario
			$scope.reminders = data;    // Pasamos los valores a la vista
		})
		.error(function(data) {
			console.log('Error createReminder: ' + data);
		});

	};

	// Seleccionar recordatorio de la vista (tabla)
	$scope.selectReminder = function(reminder) {
		$scope.newReminder = angular.copy(reminder);
		$scope.selected = true;
		console.log("Recordatorio seleccionado: ", $scope.newReminder );
	};

	// Limpiar la entrada de datos
	$scope.clear = function() {
		$scope.newReminder = {};
	};
});