$(function(){
 $('#createBracket').on('click', function(e){
 		var parameters = { 
 			jurisdiction: $('#jurisdiction').val(), 
 			taxYear: $('#taxYear').val(), 
 			filingStatus: $('#filingStatus').val(), 
 			minAGI: $('#minAGI').val(), 
 			maxAGI: $('#maxAGI').val(), 
 			taxRate: $('#taxRate').val(), 
 			baseTax: $('#baseTax').val() };
		$.post( '/api/createNewBracket',parameters, function(data) {
			location.reload(true);

     });
 });
});

$(function(){
 $('#income').on('keyup', function(e){
	if(e.keyCode === 13) {
	    $('#calculate').click();
	};
 });
});

$(function(){
	$('#calculate').click(function(){
		//if ($('#income').val() > 0){return false;}
		// Check for valid inputs
		var strippedIncome = $('#income').val().replace(/[^\d.-]/g, '');
		var strippedRetirement = $('#retirementInput').val().replace(/[^\d.-]/g, '');
		
		if (parseInt(strippedIncome) < parseInt(strippedRetirement)) {
			alert('Retirement savings must be less than Gross Income');
			return false;
		};
		
		var strippedFedAllowances = $('#fedAllowancesInput').val().replace(/\D/g,'');
		var strippedStateAllowances = $('#stateAllowancesInput').val().replace(/\D/g,'');

		var strippedAdditionalStateWitholding = $('#additionalStateWitholding').val().replace(/[^\d.-]/g, '');
		var strippedAdditionalFederalWitholding = $('#additionalFederalWitholding').val().replace(/[^\d.-]/g, '');

		var parameters = { 
			income: strippedIncome, 
			payFrequency: $('#payFrequency').val(),
			fedFilingStatus: $('#fedFilingStatusSelect').val(),
			fedAllowances: strippedFedAllowances,			
			additionalFederalWitholding: strippedAdditionalFederalWitholding,
			state: $('#stateSelect').val(),
			stateFilingStatus: $('#stateFilingStatusSelect').val(),
			stateAllowances: strippedStateAllowances,
			additionalStateWitholding: strippedAdditionalStateWitholding,
			retirement: strippedRetirement
		 };
		$.get( '/api/calcPaycheck',parameters, function(data) {
			paycheckData = $.parseJSON(data);
			var totalDeductions = paycheckData.retirement;
			
			$('#fedFilingStatus').html(parameters.fedFilingStatus + ' - ' + $('#fedFilingStatusSelect option:selected').text());
			$('#stateFilingStatus').html(parameters.stateFilingStatus + ' - ' + $('#stateFilingStatusSelect option:selected').text());
			$('#fedAllowances').html(parameters.fedAllowances);
			$('#stateAllowances').html(parameters.stateAllowances);
			$('#fedAdditionalWitholding').html(parameters.additionalFederalWitholding);
			$('#stateAdditionalWitholding').html(parameters.additionalStateWitholding);
			
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
			$('#paySchedule').html(paycheckData.paySchedule);
			
		});
	});
});

