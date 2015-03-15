var express = require('express');
var app = express();
var pg = require('pg');
var async = require('async');
var bodyParser = require('body-parser');
var accounting = require('accounting');



app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

function queryDatabase(queryText,callback){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    client.query(queryText, function(err, result) {
	    	done();
			if (err){ console.error(err); callback(err); }
			callback(null, result.rows);
		});
		   
	});
}

function getUserList(callback){
	queryDatabase('SELECT * FROM personal_data',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);
	});
}

function getTaxBrackets(callback){
	queryDatabase('SELECT jurisdiction.name, minagi, maxagi, taxyear, taxrate,  filing_status_id, base_tax from tax_brackets inner join jurisdiction on tax_brackets.jurisdiction_id=jurisdiction.id Where tax_brackets.filing_status_id = 1 ORDER BY taxyear, jurisdiction_id, minagi',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);
	});
	
}

function getFilingStatusFromID(filing_status_id, callback){
	console.log('SELECT StatusName FROM Filing_Status WHERE id = '+filing_status_id);
	queryDatabase('SELECT StatusName FROM Filing_Status WHERE id = '+filing_status_id,function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);
	});

}

function getTaxBracket(jurisdiction, taxyear, agi, callback){


	if (agi>999999) agi = 999999;
	console.log('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE jurisdiction_id = '+jurisdiction+' and taxyear = '+taxyear+' and '+agi+' BETWEEN minagi and maxagi');
	queryDatabase('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE jurisdiction_id = '+jurisdiction+' and taxyear = '+taxyear+' and '+agi+' BETWEEN minagi and maxagi',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);	
	});
}

function getJurisdictions(jurisdictionType, callback){
	var queryString = '';
	if (jurisdictionType == 'All') queryString = 'SELECT * FROM Jurisdiction order by name';
	else queryString = 'SELECT * FROM Jurisdiction where type=\''+jurisdictionType+'\' order by name';
	queryDatabase(queryString,function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null, data);
	});
}

function getFilingStatuses(callback){
	queryDatabase('SELECT * from Filing_Status',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);
	});
}

function getDeductionsExemptions(state, taxyear, filing_status_id, callback){
	console.log('SELECT jurisdiction_id, amount, name FROM deductions_exemptions WHERE jurisdiction_id in (1,'+state+') and taxyear ='+taxyear+' and filing_status_id ='+filing_status_id);
	queryDatabase('SELECT jurisdiction_id, amount, name FROM deductions_exemptions WHERE jurisdiction_id in (1,'+state+') and taxyear ='+taxyear+' and filing_status_id ='+filing_status_id,function(err,data){
		if (err){console.error(err); callback(err);}
		callback(null,data);
	});
}

app.get('/getFilingStatusFromID',function(req,res){
	getFilingStatusFromID(req.query.filingStatus, function(err, data){
		if (err) { console.error(err);}
		res.send('<p>Filing Status Name: '+data[0].statusname+'</p>');
	});
});

app.post('/api/createNewBracket', function(request, response){
	console.log('request'+request.body);
	var jurisdiction = request.body.jurisdiction;
	var taxYear = request.body.taxYear;
	var minAGI = request.body.minAGI;
	var maxAGI = request.body.maxAGI;
	var taxRate = request.body.taxRate;
	var filingStatus = request.body.filingStatus;
	var baseTax = request.body.baseTax;
	
	var insertBracket = 'INSERT INTO Tax_Brackets (Jurisdiction_id,TaxYear,Filing_Status_id,MinAGI,MaxAGI,TaxRate,base_tax) VALUES ('+jurisdiction+','+taxYear+','+filingStatus+','+minAGI+','+maxAGI+','+taxRate+','+baseTax+')';
	
	console.log('insertString'+insertBracket);

	queryDatabase(insertBracket, function(err,data){
		if(err){console.error(err); }
		//response.send(request.body);
		response.status(200).send('Bracket Created');
	})

});

app.get('/api/calcPaycheck', function(request,response){
	var income = request.query.income;
	var retirement = request.query.retirement;
	var filingStatus = request.query.filingStatus;
	var state = request.query.state;
	var taxyear = 2015;

	var fedStandardDeduction = 1000;
	var fedPersonalExemption = 1000;
	var fedAGI = 0;
	var medicareAGI = 0;
	var ssAGI = 0;
	var stateAGI =0;
	var taxrate = 0;
	var baseTax = 0;
	var minAGI = 0;
	var taxDue = 0;
	var marginalIncome = 0;
	var marginalTax = 0;
	var stateStandardDeduction = 3000;
	var statePersonalExemption = 930;

	async.auto({
		getDedExempt:function(callback){
			getDeductionsExemptions(state,taxyear,filingStatus, function(err,data){
				for (var deductionIndex in data){
					switch(data[deductionIndex].jurisdiction_id){
						case 1:
							switch(data[deductionIndex].name){
								case 'Federal Standard Deduction':
									fedStandardDeduction = data[deductionIndex].amount;
									break;
								case 'Federal Personal Exemption':
									fedPersonalExemption = data[deductionIndex].amount;
									break;
							};
							break;
					};
				};

				fedAGI = income-retirement-fedStandardDeduction-fedPersonalExemption;
				medicareAGI = income;
				ssAGI = income;
				stateAGI = income-retirement-stateStandardDeduction-statePersonalExemption;

				callback(null,{fedAGI:fedAGI,ssAGI:ssAGI,medicareAGI:medicareAGI,stateAGI:stateAGI});
			}
			);
		},
		// TODO Can I consolidate these into a single applyeach???
		getFedBracket:['getDedExempt', function(callback,results){
			// Jurisdiction 1 = Federal
			getTaxBracket(1,taxyear, results.getDedExempt.fedAGI, callback);
		}],
		getSSBracket:['getDedExempt', function(callback,results){
			// Jurisdiction 4 = Social Security
			getTaxBracket(4, taxyear, results.getDedExempt.ssAGI, callback);
		}],
		getMedicareBracket:['getDedExempt', function(callback,results){
			// Jurisdiction 5 = Medicare
			getTaxBracket(5, taxyear, results.getDedExempt.medicareAGI, callback);
		}],
		getStateBracket:['getDedExempt', function(callback,results){
			getTaxBracket(state, taxyear, results.getDedExempt.stateAGI, callback);
		}]
		},
		function(err, results){
			if (err) { console.log('calcPaycheck error: '+err); return callback(err); }
			var responseText = '<div id=\'AGI\'>Federal AGI: '+accounting.formatMoney(results.getDedExempt.fedAGI)+'</div>\n';
			var totalTaxes = 0;
			var takehomePay = 0;
			// TODO Can I pull each of these calculations into the callback function above and put into an applyeach???
			// calculate fed tax
			taxrate = results.getFedBracket[0].taxrate/100;
			baseTax = results.getFedBracket[0].base_tax;
			minAGI = results.getFedBracket[0].minagi;
			marginalIncome = results.getDedExempt.fedAGI-minAGI;
			marginalTax = taxrate*marginalIncome;
			taxDue = +marginalTax + +baseTax;
			totalTaxes += taxDue;
			responseText += '<div id=\'FederalTax\'>Federal Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

			// calculate ss tax
			taxrate = results.getSSBracket[0].taxrate/100;
			baseTax = results.getSSBracket[0].base_tax;
			minAGI = results.getSSBracket[0].minagi;
			marginalIncome = results.getDedExempt.ssAGI-minAGI;
			marginalTax = taxrate*marginalIncome;
			taxDue = +marginalTax + +baseTax;
			totalTaxes += taxDue;
			responseText += '<div id=\'SocialSecurityTax\'>Social Security Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

			// calculate medicare tax
			taxrate = results.getMedicareBracket[0].taxrate/100;
			baseTax = results.getMedicareBracket[0].base_tax;
			minAGI = results.getMedicareBracket[0].minagi;
			marginalIncome = results.getDedExempt.medicareAGI-minAGI;
			marginalTax = taxrate*marginalIncome;
			taxDue = +marginalTax + +baseTax;
			totalTaxes += taxDue;
			responseText += '<div id=\'MedicareTax\'>Medicare Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

			// calculate state tax
			taxrate = results.getStateBracket[0].taxrate/100;
			baseTax = results.getStateBracket[0].base_tax;
			minAGI = results.getStateBracket[0].minagi;
			marginalIncome = results.getDedExempt.stateAGI-minAGI;
			marginalTax = taxrate*marginalIncome;
			taxDue = +marginalTax + +baseTax;
			totalTaxes += taxDue;
			responseText += '<div id=\'StateTax\'>'+state+' Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

			// Calculate Total Taxes and Takehome

			takehomePay = income-retirement-totalTaxes;
			responseText += '<div id=\'TotalTax\'>Total Tax Due: '+accounting.formatMoney(totalTaxes)+'</div>\n';
			responseText += '<div id=\'ActualTakehome\'>Actual Takehome: '+accounting.formatMoney(takehomePay)+'</div>\n';

			
			response.send(responseText);
		}
	);

});

app.get('/paycheck', function(request, response){

	async.parallel([
		function(callback){
			getFilingStatuses(function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getJurisdictions('State',function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		}

		],
		function(err,results){
			response.render('paycheck', {pageInfo: {filingStatuses:results[0],states:results[1]}});

		});
});

app.get('/admin', function(request, response) {
	async.parallel([
		function(callback){
			getUserList(function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getTaxBrackets(function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getJurisdictions('All',function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getFilingStatuses(function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		}
	],
	function(err,results){
		response.render('createTaxBrackets', {pageInfo: {users:results[0],taxBrackets:results[1],jurisdictions:results[2],filingStatuses:results[3]}});
	});
});

app.get('/newuser', function (request, response) {
  response.render('newuser');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
