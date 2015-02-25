var express = require('express');
var app = express();
var pg = require('pg');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
	var users = {};
	var taxBrackets = {};
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   
    client.query('SELECT * FROM personal_data', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {   response.render('home', {database: result.rows}); }
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
  res.render('newuser');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
