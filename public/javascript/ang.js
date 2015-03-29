angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function($scope, $http) {
		var paycheck = this;

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.filingStatuses = data;
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		$http.get('/api/getPayFrequencies').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.payFrequencies = data;
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		
		$http.get('/api/getStates').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.states = data;
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		


	    paycheck.addTodo = function() {
	      paycheck.todos.push({text:paycheck.todoText, done:false});
	      paycheck.todoText = '';
	    };
});