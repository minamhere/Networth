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
			state: $('#stateSelect').val(),
			retirement: $('#retirement').val(),
			filingStatus: $('#filingStatusSelect').val(),
			dependents: $('#dependents').val()
		 };
		$.get( '/api/calcPaycheck',parameters, function(data) {
			paycheckData = $.parseJSON(data);
			$('#fedTax').html(paycheckData.fedTax);
			$('#ssTax').html(paycheckData.ssTax);
			$('#medicareTax').html(paycheckData.medTax);
			$('#stateTax').html(paycheckData.stateTax);
			$('#stateName').html(paycheckData.stateName);
			$('#totalTax').html(paycheckData.totalTax);
			$('#retirementContributions').html(paycheckData.retirement);
			$('#paySchedule').html(paycheckData.paySchedule);
			$('#takehomePay').html(paycheckData.takehomePay);
		});
	});
});

