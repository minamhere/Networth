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
		if (parseInt($('#income').val()) < parseInt($('#retirement').val())) {
			$('#results').html('Retirement savings must be less than Gross Income');
			return false;
		}

		var parameters = { 
			income: $('#income').val(), 
			payFrequency: $('#payFrequency').val(),
			fedFilingStatus: $('#fedFilingStatusSelect').val(),
			fedAllowances: $('#fedAllowancesInput').val(),
			state: $('#stateSelect').val(),
			stateFilingStatus: $('#stateFilingStatusSelect').val(),
			stateAllowances: $('#stateAllowancesInput').val(),
			retirement: $('#retirementInput').val()
		 };
		$.get( '/api/calcPaycheck',parameters, function(data) {
			paycheckData = $.parseJSON(data);
			var totalDeductions = paycheckData.retirement;
			
			$('#fedFilingStatus').html(parameters.fedFilingStatus);
			$('#stateFilingStatus').html(parameters.stateFilingStatus);
			$('#fedAllowances').html(parameters.fedAllowances);
			$('#stateAllowances').html(parameters.stateAllowances);
			
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

