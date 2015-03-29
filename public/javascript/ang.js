angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function($scope, $http) {
		var paycheck = this;

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.filingStatuses = data;
				$scope.selectedItem = $scope.filingStatuses[0];

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
				$scope.selectedItem = $scope.payFrequencies[0];

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
				$scope.selectedItem = $scope.states[0];

			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});


		$scope.calculate = function () {
			//if ($('#income').val() > 0){return false;}
			// Check for valid inputs
			console.log($scope);
			console.log($scope.paycheck);
			var strippedIncome = $scope.paycheck.income;
			var strippedRetirement = $scope.paycheck.retirementInput;
			
			if (parseInt(strippedIncome) < parseInt(strippedRetirement)) {
				alert('Retirement savings must be less than Gross Income');
				return false;
			};
			
			var strippedFedAllowances = $scope.paycheck.fedAllowancesInput;
			var strippedStateAllowances = $scope.paycheck.stateAllowancesInput;

			var strippedAdditionalStateWitholding = $scope.paycheck.additionalStateWitholding;
			var strippedAdditionalFederalWitholding = $scope.paycheck.additionalFederalWitholding;

			var strippedAfterTaxDeduction = $scope.paycheck.afterTaxDeductionInput;

			var parameters = { 
				income: strippedIncome, 
				payFrequency: $scope.paycheck.payFrequency,
				fedFilingStatus: $scope.paycheck.fedFilingStatusSelect,
				fedAllowances: strippedFedAllowances,			
				additionalFederalWitholding: strippedAdditionalFederalWitholding,
				state: $scope.paycheck.stateSelect,
				stateFilingStatus: $scope.paycheck.stateFilingStatusSelect,
				stateAllowances: strippedStateAllowances,
				additionalStateWitholding: strippedAdditionalStateWitholding,
				retirement: strippedRetirement,
				afterTaxDeduction: strippedAfterTaxDeduction
			 };
			$.get( '/api/calcPaycheck',parameters, function(data) {
				paycheckData = $.parseJSON(data);
				var totalDeductions = paycheckData.retirement;
				
				$('#fedFilingStatus').html(parameters.fedFilingStatus + ' - ' + $('#fedFilingStatusSelect option:selected').text());
				$('#stateFilingStatus').html(parameters.stateFilingStatus + ' - ' + $('#stateFilingStatusSelect option:selected').text());
				$('#fedAllowances').html(parameters.fedAllowances);
				$('#stateAllowances').html(parameters.stateAllowances);
				$('#fedAdditionalWitholding').html(accounting.formatMoney(parameters.additionalFederalWitholding));
				$('#stateAdditionalWitholding').html(accounting.formatMoney(parameters.additionalStateWitholding));
				
				$('#grossEarnings').html(paycheckData.grossEarnings);
				$('#regEarnings').html(paycheckData.grossEarnings);
				$('#fedGrossEarnings').html(paycheckData.fedGrossEarnings);
				$('#totalTax').html(paycheckData.totalTax);
				$('#totalDeductions').html(totalDeductions);
				$('#takehomePay').html(paycheckData.takehomePay);

				$('#fedTax').html(paycheckData.fedTax);
				$('#ssTax').html(paycheckData.ssTax);
				$('#medicareTax').html(paycheckData.medTax);
				$('#stateTax').html(paycheckData.stateTax);
				$('#stateName').html(paycheckData.stateName);
				
				$('#retirementContributions').html(paycheckData.retirement);
				$('#afterTaxDeduction').html(paycheckData.afterTaxDeduction);
				$('#paySchedule').html(paycheckData.paySchedule);
				
			});
		};
		


});