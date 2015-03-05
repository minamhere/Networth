$(function(){
 $('#createBracket').on('keyup', function(e){
   if(e.keyCode === 13) {
     var parameters = { filingStatus: $(this).val() };
       $.get( '/getFilingStatusFromID',parameters, function(data) {
       $('#results').html(data);
     });
    };
 });
});

$(function(){
 $('#AGI').on('keyup', function(e){
 	if($(this).val() > 0){
	    var parameters = { agi: $(this).val() };
		$.get( '/calcFederal',parameters, function(data) {
			$('#results').html(data);
		});
	};
 });
});

