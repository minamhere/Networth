angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function($scope, $http) {
		//var paycheck = this;
		$scope.chart = null;
		$scope.fedTaxPaystub = 0;
		$scope.ssTaxPaystub = 0;
		$scope.medicareTaxPaystub = 0;
		$scope.stateTaxPaystub = 0;
		$scope.retirementContributionsPaystub = 0;
		$scope.afterTaxDeductionPaystub = 0;
		$scope.takehomePayPaystub = 0;
		$scope.state.name = "State";

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

		$scope.chart = c3.generate({
		    bindto: '#piechart',
		    size: {
		    	height: 500,
		    	width: 500
		    },
			data: {
				columns: [
					["Federal Income Tax", $scope.fedTaxPaystub],
			    	["Social Security Tax", $scope.ssTaxPaystub],
			    	["Medicare Tax", $scope.medicareTaxPaystub],
			    	[$scope.state.name+" Tax", $scope.stateTaxPaystub],
			    	["Retirement Deductions", $scope.retirementContributionsPaystub],
			    	["After-Tax Deductions", $scope.afterTaxDeductionPaystub],
			    	["Take Home Pay", $scope.takehomePayPaystub]
				],
			    type : 'pie'
			},
			pie: {
			    title: "Paycheck Breakdown:",
			}
		});
		

		$scope.calculate = function () {
			


			var strippedIncome = $scope.income || 0;
			var strippedRetirement = $scope.retirementInput || 0;
			
			if (parseInt(strippedIncome) < parseInt(strippedRetirement)) {
				alert('Retirement savings must be less than Gross Income');
				return false;
			};
			
			var strippedFedAllowances = $scope.fedAllowances || 0;
			var strippedStateAllowances = $scope.stateAllowances || 0;

			var strippedAdditionalStateWitholding = $scope.additionalStateWitholding || 0;
			var strippedAdditionalFederalWitholding = $scope.additionalFederalWitholding || 0;

			var strippedAfterTaxDeduction = $scope.afterTaxDeductionInput || 0;

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
					$scope.totalDeductionsPaystub = paycheckData.retirement + paycheckData.afterTaxDeduction;
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