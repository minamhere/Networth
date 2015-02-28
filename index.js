var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

var users;
var taxBrackets;

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
	queryDatabase('select jurisdiction.name, tax_brackets.minagi, tax_brackets.maxagi from tax_brackets inner join jurisdiction on tax_brackets.jurisdiction_id=jurisdiction.id Where tax_brackets.filing_status_id = 1 AND taxyear = 2015',function(err,data){
		if (err){ console.error(err); callback(err);}
		callback(null,data);
	});
	
}

app.post('/api/createNewBracket', function(request, response){
	console.log('request'+request.body);
	var jurisdiction = request.body.jurisdiction;
	var taxYear = request.body.taxYear;
	var minAGI = request.body.minAGI;
	var maxAGI = request.body.maxAGI;
	var taxRate = request.body.taxRate;
	var filingStatus = request.body.filingStatus;
	
	var insertBracket = 'INSERT INTO Tax_Brackets (Jurisdiction_id,TaxYear,Filing_Status,MinAGI,MaxAGI,TaxRate) VALUES ('+jurisdiction+','+taxYear+','+filingStatus+','+minAGI+','+maxAGI+','+taxRate+')';
	
	console.log('insertString'+insertBracket);

	
	response.render('test');
});


app.get('/', function(request, response) {


	getUserList(function(err,data){
		users = data;
	});
	
	getTaxBrackets(function(err,data){
		taxBrackets = data;	
	});

	response.render('test', {pageInfo: {users:users,taxBrackets:taxBrackets}});

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
