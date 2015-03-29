angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function() {
		var paycheck = this;

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				paycheck.filingStatuses = data;
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		$http.get('/api/getPayFrequencies').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				paycheck.payFrequencies = data;
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});


	    paycheck.addTodo = function() {
	      paycheck.todos.push({text:paycheck.todoText, done:false});
	      paycheck.todoText = '';
	    };
 
   
 
   
	};
});