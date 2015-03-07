var express = require('express')
	, app = express()
	, db = require('./models');
var pg = require('pg');

var bodyParser = require('body-parser');

var devMode = true;


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//app.use(express.logger('dev'));
//app.use(app.router);

// development only
/*if (devMode) {
  app.use(express.errorHandler());
}
*/

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

function getTaxBracket(agi, jurisdiction_id, filing_status_id, callback){
	console.log('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE taxyear = 2015 and minagi < '+agi+' and maxagi > '+agi+'and jurisdiction_id = '+jurisdiction_id+' and filing_status_id='+filing_status_id);
	queryDatabase('SELECT taxrate,base_tax,minagi FROM Tax_Brackets WHERE taxyear = 2015 and minagi < '+agi+' and maxagi > '+agi+'and jurisdiction_id = '+jurisdiction_id+' and filing_status_id='+filing_status_id,function(err,data){
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

app.get('/calcPaycheck', function(request,response){
	var agi = request.query.agi;
	var taxrate = 0;
	var baseTax = 1;
	var minAGI = 0;
	var taxDue = 0;
	var marginalIncome = 0;
	var marginalTax = 0;
	console.log('agi from user: '+agi);

	getaxBracket(agi, jurisdiction, filingStatus, function(err,data){
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
});

app.get('/calc', function(request, response){



	response.render('calc');

});

app.get('/admin', function(request, response) {
	var users;
	var taxBrackets;
	var jurisdictions;
	var filingStatuses;

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

db.sequelize.sync().then(function(){
	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});	
});

