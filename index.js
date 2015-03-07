var express = require('express');
var app = express();
var pg = require('pg');
var async = require('async');
var bodyParser = require('body-parser');



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
      if (err)
       { console.error(err); callback(err); }
      else
       { callback(null, result.rows); }
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
	queryDatabase('SELECT jurisdiction.name, minagi, maxagi, taxyear, taxrate from tax_brackets inner join jurisdiction on tax_brackets.jurisdiction_id=jurisdiction.id Where tax_brackets.filing_status_id = 1',function(err,data){
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

	console.log('SELECT taxrate,base_tax,minagi FROM Tax_Brackets b INNER JOIN jurisdiction j on j.id = b.jurisdiction_id WHERE j.name = \''+jurisdiction+'\' and taxyear = '+taxyear+' and minagi < '+agi+' and maxagi > '+agi);
	queryDatabase('SELECT taxrate,base_tax,minagi FROM Tax_Brackets b INNER JOIN jurisdiction j on j.id = b.jurisdiction_id WHERE j.name = \''+jurisdiction+'\' and taxyear = '+taxyear+' and minagi < '+agi+' and maxagi > '+agi,function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);	
	});
}

function getJurisdictions(callback){
	console.log('SELECT * FROM Jurisdiction')
	queryDatabase('SELECT * FROM Jurisdiction',function(err,data){
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
		response.send(request.body);
	})

});

app.get('/api/calcPaycheck', function(request,response){
	var agi = request.query.agi;
	var taxrate = 0;
	var baseTax = 1;
	var minAGI = 0;
	var taxDue = 0;
	var marginalIncome = 0;
	var marginalTax = 0;
	var taxyear = 2015;
	console.log('agi from user: '+agi);

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
		}
	],
	function(err,results){
		var responseText = '';
		// calculate fed tax
		taxrate = results[0].taxrate/100;
		baseTax = results[0].base_tax;
		minAGI = results[0].minagi;
		console.log('taxrate: '+taxrate);
		console.log('baseTax: '+baseTax);
		console.log('minAGI: '+minAGI);
		marginalIncome = agi-minAGI;
		marginalTax = taxrate*marginalIncome;
		taxDue = +marginalTax + +baseTax;
		responseText += '<p>Federal Tax Due: '+taxDue+'</p>AGI: '+agi+'\n';

		

		// calculate ss tax
		console.log('SS: '+results[1]);
		// calculate medicare tax
		console.log('Medicare: '+results[2]);
		// return taxes
		console.log('Fed: '+taxDue);
		response.send(responseText);
	});

	/*
	getTaxBracket(agi,function(err,data){
		if (err) { console.error(err); callback(err);}
		if (data){
			taxrate = data[0].taxrate/100;
			baseTax = data[0].base_tax;
			minAGI = data[0].minagi;
			marginalIncome = agi-minAGI;
			console.log('marginalIncome: '+marginalIncome);
			marginalTax = taxrate*marginalIncome;
			console.log('marginalTax: '+marginalTax);
			taxDue = +marginalTax + +baseTax;
			
			var responseText = '<p>Federal Tax Due: '+taxDue+'</p>AGI: '+agi;

			response.send(responseText);
		}
	});
	*/
});

app.get('/calc', function(request, response){



	response.render('calc');

});

app.get('/admin', function(request, response) {
	var users;
	var taxBrackets;
	var jurisdictions;
	var filingStatuses;

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
			getJurisdictions(function(err,data){
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
		users = results[0];
		taxBrackets = results[1];
		jurisdictions = results[2];
		filingStatuses = results[3];
		response.render('createTaxBrackets', {pageInfo: {users:users,taxBrackets:taxBrackets,jurisdictions:jurisdictions,filingStatuses:filingStatuses}});
	});


	/*
	getUserList(function(err,data){
		users = data;
		getTaxBrackets(function(err,data){
			taxBrackets = data;	
			getJurisdictions(function(err,data){
				jurisdictions = data;
				getFilingStatuses(function(err,data){
					filingStatuses = data;
					response.render('createTaxBrackets', {pageInfo: {users:users,taxBrackets:taxBrackets,jurisdictions:jurisdictions,filingStatuses:filingStatuses}});
				});
			});
		});
	});
	*/
});

app.get('/TaxBrackets', function(request, response) {
	var users = {};
	var taxBrackets = {};
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {

    client.query('select jurisdiction.name, tax_brackets.minagi, tax_brackets.maxagi from tax_brackets inner join jurisdiction on tax_brackets.jurisdiction_id=jurisdiction.id Where tax_brackets.filing_status_id = 1 AND taxyear = 2015', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
       	response.render('taxbrackets', {database: result.rows}); }
	});

	});

});

app.get('/newuser', function (request, response) {
  response.render('newuser');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
