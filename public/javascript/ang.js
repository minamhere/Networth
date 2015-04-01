angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function($scope, $http) {
		var paycheck = this;

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.filingStatuses = data;
				$scope.fedFilingStatus = $scope.filingStatuses[0];
				$scope.stateFilingStatus = $scope.filingStatuses[0];

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
				$scope.payFrequency = $scope.payFrequencies[0];

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
				$scope.state = $scope.states[0];

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
				additionalFederalWitholding: strippedAdditionalFederalWitholding || 0,
				state: $scope.paycheck.state.id,
				stateFilingStatus: $scope.paycheck.stateFilingStatus.id,
				stateAllowances: strippedStateAllowances,
				additionalStateWitholding: strippedAdditionalStateWitholding || 0,
				retirement: strippedRetirement || 0,
				afterTaxDeduction: strippedAfterTaxDeduction || 0
			 };
			$http({method: 'GET', url: '/api/calcPaycheck', params: parameters}).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					//paycheckData = $.parseJSON(data);
					console.log(data);
					paycheckData = data;
					var totalDeductions = paycheckData.retirement;
					
					$scope.fedFilingStatusPaystub = $scope.paycheck.fedFilingStatus.id + ' - ' + $scope.paycheck.fedFilingStatus.statusname;
					$scope.stateFilingStatusPaystub = $scope.paycheck.stateFilingStatus.id + ' - ' + $scope.paycheck.stateFilingStatus.statusname;
					$scope.fedAllowancesPaystub = strippedFedAllowances;
					$scope.stateAllowancesPaystub = strippedStateAllowances;
					$scope.fedAdditionalWitholdingPaystub = strippedAdditionalFederalWitholding;
					$scope.stateAdditionalWitholdingPaystub = strippedAdditionalStateWitholding;
					
					$scope.grossEarningsPaystub = paycheckData.grossEarnings;
					$scope.regEarningsPaystub = paycheckData.grossEarnings;
					$scope.fedGrossEarningsPaystub = paycheckData.fedGrossEarnings;
					$scope.totalTaxPaystub = paycheckData.totalTax;
					$scope.totalDeductionsPaystub = totalDeductions;
					$scope.takehomePayPaystub = paycheckData.takehomePay;

					$scope.fedTaxPaystub = paycheckData.fedTax;
					$scope.ssTaxPaystub = paycheckData.ssTax;
					$scope.medicareTaxPaystub = paycheckData.medTax;
					$scope.stateTaxPaystub = paycheckData.stateTax;
					$scope.stateNamePaystub = paycheckData.stateName;
					
					$scope.retirementContributionsPaystub = paycheckData.retirement;
					$scope.afterTaxDeductionPaystub = paycheckData.afterTaxDeduction;
					$scope.paySchedulePaystub = paycheckData.paySchedule;

				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			
		};
		


});