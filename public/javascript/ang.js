angular.module('paycheckCalculator', ["chart.js"])
	.controller('PaycheckController', function($scope, $http, $filter) {
		//var paycheck = this;

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.filingStatuses = data;
				$scope.fedFilingStatus = data[0];
				$scope.stateFilingStatus = data[0];

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
				$scope.payFrequency = data[0];

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
				$scope.state = data[0];

			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		$scope.Nocalculate = function() {
			return false;
		}

		$scope.calculate = function () {
			
			// Check for valid inputs
			if (!$('#income').val() > 0){return false;}

			var strippedIncome = $scope.income;
			var strippedRetirement = $scope.retirementInput;
			
			if (parseInt(strippedIncome) < parseInt(strippedRetirement)) {
				alert('Retirement savings must be less than Gross Income');
				return false;
			};
			
			var strippedFedAllowances = $scope.fedAllowances;
			var strippedStateAllowances = $scope.stateAllowances;

			var strippedAdditionalStateWitholding = $scope.additionalStateWitholding;
			var strippedAdditionalFederalWitholding = $scope.additionalFederalWitholding;

			var strippedAfterTaxDeduction = $scope.afterTaxDeductionInput;

			var parameters = { 
				income: strippedIncome, 
				payFrequency: $scope.payFrequency.id,
				fedFilingStatus: $scope.fedFilingStatus.id,
				fedAllowances: strippedFedAllowances,			
				additionalFederalWitholding: strippedAdditionalFederalWitholding || 0,
				state: $scope.state.id,
				stateFilingStatus: $scope.stateFilingStatus.id,
				stateAllowances: strippedStateAllowances,
				additionalStateWitholding: strippedAdditionalStateWitholding || 0,
				retirement: strippedRetirement || 0,
				afterTaxDeduction: strippedAfterTaxDeduction || 0
			 };
			$http({method: 'GET', url: '/api/calcPaycheck', params: parameters}).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					paycheckData = data;
					var totalDeductions = paycheckData.retirement;
					
					$scope.fedFilingStatusPaystub = $scope.fedFilingStatus.id + ' - ' + $scope.fedFilingStatus.statusname;
					$scope.stateFilingStatusPaystub = $scope.stateFilingStatus.id + ' - ' + $scope.stateFilingStatus.statusname;
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

					$scope.labels = ["Federal Income Tax", "Social Security Tax", "Medicare Tax", paycheckData.stateName+" Tax", "Retirement Deductions", "After-Tax Deductions", "Take Home Pay"];
					$scope.data = [
						{
							value:$scope.fedTaxPaystub
						}, 
						{
							value:$scope.ssTaxPaystub
						}, 
						{
							value:$scope.medicareTaxPaystub
						}, 
						{
							value:$scope.stateTaxPaystub
						}, 
						{
							value:$scope.retirementContributionsPaystub
						}, 
						{
							value:$scope.afterTaxDeductionPaystub
						}, 
						{
							value:$scope.takehomePayPaystub
						}
					];


				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			
		};
		


});