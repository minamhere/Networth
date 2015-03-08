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
	console.log('SELECT taxrate,base_tax,minagi FROM Tax_Brackets b INNER JOIN jurisdiction j on j.id = b.jurisdiction_id WHERE j.name = \''+jurisdiction+'\' and taxyear = '+taxyear+' and '+agi+' BETWEEN minagi and maxagi');
	queryDatabase('SELECT taxrate,base_tax,minagi FROM Tax_Brackets b INNER JOIN jurisdiction j on j.id = b.jurisdiction_id WHERE j.name = \''+jurisdiction+'\' and taxyear = '+taxyear+' and '+agi+' BETWEEN minagi and maxagi',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);	
	});
}

function getJurisdictions(jurisdictionType, callback){
	var queryString = '';
	if (jurisdictionType == 'All') queryString = 'SELECT * FROM Jurisdiction';
	else queryString = 'SELECT * FROM Jurisdiction where type=\''+jurisdictionType+'\'';
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
	var agi = income-retirement;
	var state = request.query.state;
	var taxrate = 0;
	var baseTax = 1;
	var minAGI = 0;
	var taxDue = 0;
	var marginalIncome = 0;
	var marginalTax = 0;
	var taxyear = 2015;

	async.parallel([
		function(callback){
			getTaxBracket('Federal',taxyear, agi,function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getTaxBracket('Social Security', taxyear, agi,function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getTaxBracket('Medicare', taxyear, agi,function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		},
		function(callback){
			getTaxBracket(state, taxyear, agi,function(err,data){
				if (err) return callback(err);
      			callback(null, data);
			});
		}
	],
	function(err,results){
		if (err) { console.log('calcPaycheck error: '+err); return callback(err); }
		var responseText = '';
		var totalTaxes = 0;
		var takehomePay = 0;
		// calculate fed tax
		taxrate = results[0][0].taxrate/100;
		baseTax = results[0][0].base_tax;
		minAGI = results[0][0].minagi;
		marginalIncome = agi-minAGI;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +baseTax;
		totalTaxes += taxDue;
		responseText += '<div id=\'FederalTax\'>Federal Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

		// calculate ss tax
		taxrate = results[1][0].taxrate/100;
		baseTax = results[1][0].base_tax;
		minAGI = results[1][0].minagi;
		marginalIncome = agi-minAGI;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +baseTax;
		totalTaxes += taxDue;
		responseText += '<div id=\'SocialSecurityTax\'>Social Security Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

		// calculate medicare tax
		taxrate = results[2][0].taxrate/100;
		baseTax = results[2][0].base_tax;
		minAGI = results[2][0].minagi;
		marginalIncome = agi-minAGI;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +baseTax;
		totalTaxes += taxDue;
		responseText += '<div id=\'MedicareTax\'>Medicare Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

		// calculate state tax
		taxrate = results[3][0].taxrate/100;
		baseTax = results[3][0].base_tax;
		minAGI = results[3][0].minagi;
		marginalIncome = agi-minAGI;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +baseTax;
		totalTaxes += taxDue;
		responseText += '<div id=\'StateTax\'>'+state+' Tax Due: '+accounting.formatMoney(taxDue)+'</div>\n';

		// Calculate Total Taxes and Takehome

		takehomePay = agi-totalTaxes;
		responseText += '<div id=\'TotalTax\'>Total Tax Due: '+accounting.formatMoney(totalTaxes)+'</div>\n';
		responseText += '<div id=\'ActualTakehome\'>Actual Takehome: '+accounting.formatMoney(takehomePay)+'</div>\n';

		
		response.send(responseText);
	});
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
  console.log("Node app is running at localhost:" + app.get('port'));
});
