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
			
			var strippedFedAllowances = $scope.paycheck.fedAllowances;
			var strippedStateAllowances = $scope.paycheck.stateAllowances;

			var strippedAdditionalStateWitholding = $scope.paycheck.additionalStateWitholding;
			var strippedAdditionalFederalWitholding = $scope.paycheck.additionalFederalWitholding;

			var strippedAfterTaxDeduction = $scope.paycheck.afterTaxDeductionInput;

			var parameters = { 
				income: strippedIncome, 
				payFrequency: $scope.paycheck.payFrequency.id,
				fedFilingStatus: $scope.paycheck.fedFilingStatus.id,
				fedAllowances: strippedFedAllowances,			
				additionalFederalWitholding: strippedAdditionalFederalWitholding,
				state: $scope.paycheck.state.id,
				stateFilingStatus: $scope.paycheck.stateFilingStatus.id,
				stateAllowances: strippedStateAllowances,
				additionalStateWitholding: strippedAdditionalStateWitholding,
				retirement: strippedRetirement,
				afterTaxDeduction: strippedAfterTaxDeduction
			 };
			$http({method: 'GET', url: '/api/calcPaycheck', params: parameters}).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					paycheckData = $.parseJSON(data);
					var totalDeductions = paycheckData.retirement;
					
					$scope.fedFilingStatus = $scope.paycheck.fedFilingStatus.id + ' - ' + $scope.paycheck.fedFilingStatus.statusname;
					$scope.stateFilingStatus = $scope.paycheck.stateFilingStatus.id + ' - ' + $scope.paycheck.stateFilingStatus.statusname;
					$scope.fedAllowances = strippedFedAllowances;
					$scope.stateAllowances = strippedStateAllowances;
					$scope.fedAdditionalWitholding = strippedAdditionalFederalWitholding;
					$scope.stateAdditionalWitholding = strippedAdditionalStateWitholding;
					
					$scope.grossEarnings = paycheckData.grossEarnings;
					$scope.regEarnings = paycheckData.grossEarnings;
					$scope.fedGrossEarnings = paycheckData.fedGrossEarnings;
					$scope.totalTax = paycheckData.totalTax;
					$scope.totalDeductions = totalDeductions;
					$scope.takehomePay = paycheckData.takehomePay;

					$scope.fedTax = paycheckData.fedTax;
					$scope.ssTax = paycheckData.ssTax;
					$scope.medicareTax = paycheckData.medTax;
					$scope.stateTax = paycheckData.stateTax;
					$scope.stateName = paycheckData.stateName;
					
					$scope.retirementContributions = paycheckData.retirement;
					$scope.afterTaxDeduction = paycheckData.afterTaxDeduction;
					$scope.paySchedule = paycheckData.paySchedule;

				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			
		};
		


});