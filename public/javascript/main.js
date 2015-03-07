$(function(){
 $('#createBracket').on('click', function(e){
 		var parameters = { 
 			jurisdiction: $('#jurisdiction').val(), taxYear: $('#taxYear').val(), 
 			filingStatus: $('#filingStatus').val(), minAGI: $('#minAGI').val(), maxAGI: $('#maxAGI').val(), 
 			taxRate: $('#taxRate').val(), baseTax: $('#baseTax').val() };
		$.post( '/api/createNewBracket',parameters, function(data) {
			location.reload(true);

     });
 });
});

$(function(){
 $('#AGI').on('keyup', function(e){
	if(e.keyCode === 13) {
	    var parameters = { agi: $(this).val() };
		$.get( '/api/calcPaycheck',parameters, function(data) {
			$('#results').html(data);
		});
	};
 });
});

