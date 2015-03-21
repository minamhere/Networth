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

function handleState(stateInfo, callback){
	//stateInfo = {jurisdiction_id:stateID, income:income, retirement:retirement, taxyear: taxyear, filingStatus: filingStatus};
	switch(stateInfo.jurisdiction_id){
		case "3": // Virginia
			async.waterfall([
				function(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function(err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					callback(null, stateAGI);
				}
				],
				function(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);

					
				}
			);
			break;
		case "6": // Colorado
		case "7": // Alabama
		case "8": // Alaska
		case "9": // Arizona 
		case "10": // Arkansas
		case "11": // California
		case "12": // Connecticut
		case "13": // Delaware
		case "14": // Florida
		case "15": // Georgia
		case "16": // Hawaii
		case "17": // Idaho
		case "18": // Illinois
		case "19": // Indiana
		case "20": // Iowa
		case "21": // Kansas
		case "22": // Kentucky
		case "23": // Louisiana
		case "24": // Maine
		case "25": // Maryland
		case "26": // Massachusetts
		case "27": // Michigan
		case "28": // Minnesota
		case "29": // Mississippi
		case "30": // Missouri
		case "31": // Montana
		case "32": // Nebraska
		case "33": // Nevada
		case "34": // New Hampshire
		case "35": // New Jersey
		case "36": // New Mexico
		case "37": // New York
		case "38": // North Carolina
		case "39": // North Dakota
		case "40": // Ohio
		case "41": // Oklahoma
		case "42": // Oregon
		case "43": // Pennsylvania
		case "44": // Rhode Island
		case "45": // South Carolina
		case "46": // South Dakota
		case "47": // Tennessee
		case "48": // Texas
		case "49": // Utah
		case "50": // Vermont
		case "51": // Washington
		case "52": // West Virginia
		case "53": // Wisconsin
		case "54": // Wyoming
		case "55": // American Samoa
		case "56": // District of Columbia
		case "57": // Federated States of Micronesia
		case "58": // Guam
		case "59": // Marshall Islands
		case "60": // Northern Mariana Islands
		case "61": // Palau
		case "62": // Puerto Rico
		case "63": // Virgin Islands
		default: 
			console.log('Default state case');

	}

}
function getUserList(callback){
	queryDatabase('SELECT * FROM personal_data',callback);
}

function getTaxBrackets(callback){
	queryDatabase('SELECT jurisdiction.name, minagi, maxagi, taxyear, taxrate,  filing_status_id, base_tax from tax_brackets inner join jurisdiction on tax_brackets.jurisdiction_id=jurisdiction.id Where tax_brackets.filing_status_id = 1 ORDER BY taxyear, jurisdiction_id, minagi',callback);
}

function getFilingStatusFromID(filing_status_id, callback){
	console.log('SELECT StatusName FROM Filing_Status WHERE id = '+filing_status_id);
	queryDatabase('SELECT StatusName FROM Filing_Status WHERE id = '+filing_status_id,callback);
}

function getTaxDue(bracketInfo, callback){
	if (bracketInfo.agi>9999999) bracketInfo.agi = 9999999;
	console.log('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE jurisdiction_id = '+bracketInfo.jurisdiction_id+' and taxyear = '+bracketInfo.taxyear+' and '+bracketInfo.agi+' BETWEEN minagi and maxagi');
	queryDatabase('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE jurisdiction_id = '+bracketInfo.jurisdiction_id+' and taxyear = '+bracketInfo.taxyear+' and '+bracketInfo.agi+' BETWEEN minagi and maxagi',function(err,data){
		if (err) callback('No Tax Bracket Available'+err);
		taxrate = data[0].taxrate/100;
		marginalIncome = bracketInfo.agi-data[0].minagi;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +data[0].base_tax;
		callback(null,taxDue);
	});
}

function getJurisdictions(jurisdictionType, callback){
	var queryString = '';
	if (jurisdictionType == 'All') queryString = 'SELECT * FROM Jurisdiction order by name';
	else queryString = 'SELECT * FROM Jurisdiction where type=\''+jurisdictionType+'\' order by name';
	queryDatabase(queryString,callback);
}

function getPayFrequencies(callback){
	// id, schedulename, pay_periods_per_year
	queryDatabase('SELECT * from pay_schedule',callback);
}

function getFilingStatuses(callback){
	queryDatabase('SELECT * from Filing_Status',callback);
}

function getStateNameFromID(stateID, callback){
	queryDatabase('SELECT name from jurisdiction where id = '+stateID, function(err, results){
		callback(null, results[0].name);
	});
}

function getPayPeriodsFromFrequencyID(payFrequencyID, callback){
	console.log('SELECT schedulename, pay_periods_per_year from pay_schedule where id ='+payFrequencyID);
	queryDatabase('SELECT schedulename, pay_periods_per_year from pay_schedule where id = '+payFrequencyID, function(err, results){
		callback(null, {name:results[0].schedulename, payperiods:results[0].pay_periods_per_year});
	})
}

function getDeductionsExemptions(jurisdiction_id, taxyear, filing_status_id, callback){
	console.log('SELECT jurisdiction_id, amount, deduction_exemption_type FROM deductions_exemptions WHERE jurisdiction_id ='+jurisdiction_id+' and taxyear ='+taxyear+' and filing_status_id ='+filing_status_id);
	queryDatabase('SELECT jurisdiction_id, amount, deduction_exemption_type FROM deductions_exemptions WHERE jurisdiction_id ='+jurisdiction_id+' and taxyear ='+taxyear+' and filing_status_id ='+filing_status_id,callback);
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
		response.status(200).send('Bracket Created');
	})
});

app.get('/api/calcPaycheck', function(request,response){
	var income = request.query.income;
	var payFrequencyID = request.query.payFrequency;
	var retirement = request.query.retirement;
	var filingStatus = request.query.filingStatus;
	var dependents = request.query.dependents;
	var stateID = request.query.state;
	var taxyear = 2015;

	var fedStandardDeduction = 0;
	var fedPersonalExemption = 0;
	var fedAGI = 0;
	var stateAGI =0;
	var stateStandardDeduction = 0;//3000; // VA for testing
	var statePersonalExemption = 0;//930; // VA for testing

	async.auto({
		getDedExempt:function(callback){
			var fedJurisdiction_id = 1
			getDeductionsExemptions(fedJurisdiction_id,taxyear,filingStatus, function(err,data){
				for (var deductionIndex in data){
					switch(data[deductionIndex].deduction_exemption_type){
						case 1: // 1 = Standard Deduction
							fedStandardDeduction = data[deductionIndex].amount;
							break;
						case 2:// 2 = Personal Exemption
							fedPersonalExemption = data[deductionIndex].amount;
							break;
					};
				};

				fedAGI = income-retirement-fedStandardDeduction-fedPersonalExemption;
				callback(null,{fedAGI:fedAGI,ssAGI:income,medicareAGI:income});
			});
		},
		getStateTax:function(callback, results){
			var stateInfo = {
				jurisdiction_id:stateID, 
				income:income, 
				retirement:retirement, 
				taxyear: taxyear, 
				filingStatus: filingStatus
			};
			handleState(stateInfo, callback);
		},
		getFedTax:['getDedExempt', function(callback,results){
			var brackets = [
				{jurisdiction_id:1, agi:results.getDedExempt.fedAGI, taxyear: taxyear},
				{jurisdiction_id:4, agi:results.getDedExempt.ssAGI, taxyear: taxyear},
				{jurisdiction_id:5, agi:results.getDedExempt.medicareAGI, taxyear: taxyear},
			];

			async.map(brackets, getTaxDue, callback);
		}],
		getStateName:function(callback){
			getStateNameFromID(stateID, callback);
		},
		getPayPeriods:function(callback){
			getPayPeriodsFromFrequencyID(payFrequencyID,callback);
		}
		},
		function(err, results){
			if (err) { console.log('calcPaycheck error: '+err); return callback(err); }
			var responseText = '<div id=\'AGI\'>Federal Annual AGI: '+accounting.formatMoney(results.getDedExempt.fedAGI)+'</div>\n';
			var takehomePay = 0;
			var payPeriods = results.getPayPeriods.payperiods;
			var fedTax = results.getFedTax[0]/payPeriods;
			var ssTax = results.getFedTax[1]/payPeriods;
			var medTax = results.getFedTax[2]/payPeriods;
			var stateTax = results.getStateTax/payPeriods;
			var retirementContribution = retirement/payPeriods;
			takehomePay = (income/payPeriods)-retirementContribution-fedTax-ssTax-medTax-stateTax;

			responseText = {
				fedTax: accounting.formatMoney(fedTax), 
				ssTax: accounting.formatMoney(ssTax), 
				medTax: accounting.formatMoney(medTax),
				stateTax: accounting.formatMoney(stateTax),
				stateName: results.getStateName,
				totalTax: accounting.formatMoney(fedTax+ssTax+medTax+stateTax),
				retirement: accounting.formatMoney(retirementContribution),
				paySchedule: results.getPayPeriods.name,
				takehomePay: accounting.formatMoney(takehomePay)
			};

			response.send(JSON.stringify(responseText));
		}
	);

});

app.get('/paycheck', function(request, response){
	async.parallel([
		function(callback){
			getFilingStatuses(callback);
		},
		function(callback){
			getJurisdictions('State',callback);
		},
		function(callback){
			getPayFrequencies(callback);
		}
	],
		function(err,results){
			response.render('paycheck', {pageInfo: {filingStatuses:results[0],states:results[1],payFrequencies:results[2]}});
		});
});

app.get('/admin', function(request, response) {
	async.parallel([
		function(callback){
			getUserList(callback);
		},
		function(callback){
			getTaxBrackets(callback);
		},
		function(callback){
			getJurisdictions('All',callback);
		},
		function(callback){
			getFilingStatuses(callback);
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
