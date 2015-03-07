$(function(){
 $('#createBracket').on('click', function(e){
 		var parameters = { 
 			jurisdiction: $(#jurisdiction).val(), taxYear: $(#taxYear).val(), 
 			filingStatus: $(#filingStatus).val(), minAGI: $(#minAGI).val(), 
 			maxAGI: $(#maxAGI).val(), taxRate: $(#taxRate).val(), baseTax: $(#baseTax).val() }
		$.post( '/api/createNewBracket',parameters, function(data) {
			$('#results').html(data);
     });
 });
});

$(function(){
 $('#AGI').on('keyup', function(e){
	if(e.keyCode === 13) {
	    var parameters = { agi: $(this).val() };
		$.get( '/calcFederal',parameters, function(data) {
			$('#results').html(data);
		});
	};
 });
});


Jurisdiction_id,TaxYear,Filing_Status_id,MinAGI,MaxAGI,TaxRate,baseTax

jurisdiction+','+taxYear+','+filingStatus+','+minAGI+','+maxAGI+','+taxRate+','baseTax+')';
	
