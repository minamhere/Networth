angular.module('paycheckCalculator', [])
	.controller('PaycheckController', function($scope, $http) {
		//var paycheck = this;
		//$scope.chart = null;
		$scope.fedTaxPaystub = 0;
		$scope.ssTaxPaystub = 0;
		$scope.medicareTaxPaystub = 0;
		$scope.stateTaxPaystub = 0;
		$scope.retirementContributionsPaystub = 0;
		$scope.takehomePayPaystub = 0;

		$scope.deductionList = {
			deductions: [
				{
				deductionNameInput: "401k",
				deductionAmountInput: 18000,
				exemptFromFedInput: true,
				exemptFromStateInput: true,
				exemptFromSSInput: false,
				exemptFromMedInput: false
				},
				{
				deductionNameInput: "Disability",
				deductionAmountInput: 830,
				exemptFromFedInput: false,
				exemptFromStateInput: false,
				exemptFromSSInput: false,
				exemptFromMedInput: false
				}
			]
		};

	    $http.get('/api/getFilingStatuses').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.filingStatuses = data;
				$scope.fedFilingStatus = data[0];
				$scope.stateFilingStatus = data[0];
				$scope.fedAllowances = 2;
				$scope.stateAllowances = 1;

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

		var chart = c3.generate({
		    bindto: '#piechart',
		    size: {
		    	height: 500,
		    	width: 500
		    },
			data: {
				columns: [
					["Medicare", $scope.medicareTaxPaystub],
					["SS", $scope.ssTaxPaystub],
			    	["State", $scope.stateTaxPaystub],
			    	["Federal", $scope.fedTaxPaystub],
			    	["Retirement", $scope.retirementContributionsPaystub],
			    	["TakeHome", $scope.takehomePayPaystub]
				],
				names: {
					Federal: "Federal Tax",
					SS: "Social Security Tax",
					Medicare: "Medicare Tax",
					State: "State Tax",
					Retirement: "Retirement Contributions",
					TakeHome: "Take Home Pay"
				},
				order: null,
			    type : 'pie'
			},
			pie: {
			    title: "Paycheck Breakdown:",
			}
		});
		

		$scope.calculate = function () {
			

			var strippedIncome = $scope.income || 0;
			var strippedDeduction = $scope.deductionAmountInput || 0;
			
			var strippedFedAllowances = $scope.fedAllowances || 0;
			var strippedStateAllowances = $scope.stateAllowances || 0;

			var strippedAdditionalStateWitholding = $scope.additionalStateWitholding || 0;
			var strippedAdditionalFederalWitholding = $scope.additionalFederalWitholding || 0;

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
				deductions: JSON.stringify($scope.deductionList.deductions)
			 };
			$http({method: 'GET', url: '/api/calcPaycheck', params: parameters}).
				success(function(paycheckData, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					
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
					$scope.totalDeductionsPaystub = paycheckData.retirement;
					$scope.takehomePayPaystub = paycheckData.takehomePay;

					$scope.fedTaxPaystub = paycheckData.fedTax;
					$scope.ssTaxPaystub = paycheckData.ssTax;
					$scope.medicareTaxPaystub = paycheckData.medTax;
					$scope.stateTaxPaystub = paycheckData.stateTax;
					$scope.stateNamePaystub = paycheckData.stateName;
					
					$scope.retirementContributionsPaystub = paycheckData.retirement;
					$scope.paySchedulePaystub = paycheckData.paySchedule;

					$scope.deductionNamePaystub =  $scope.deductionNameInput,
					$scope.deductionAmountPaystub =  $scope.deductionAmountInput,

					chart.data.names({State: paycheckData.stateName + " Tax", Retirement: $scope.deductionNamePaystub});
					chart.load({
						columns: [
							["Medicare", $scope.medicareTaxPaystub],
							["SS", $scope.ssTaxPaystub],
							["State", $scope.stateTaxPaystub],
					    	["Federal", $scope.fedTaxPaystub],
					    	["Retirement", $scope.retirementContributionsPaystub],
					    	["TakeHome", $scope.takehomePayPaystub]
						]
					});

				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			
		};

		$scope.addDeduction = function () {
			$scope.deductionList.push({
				deductionNameInput: "",
				deductionAmountInput: null,
				exemptFromFedInput: false,
				exemptFromStateInput: false,
				exemptFromSSInput: false,
				exemptFromMedInput: false
				})
		};
	})
	.directive('myDeduction', function(){
		return {
			restrict: 'A',
			templateUrl: '../directives/myDeduction.html'
		};
	})

;

/*
*/