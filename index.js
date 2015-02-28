var express = require('express');
var app = express();
var pg = require('pg');

var users;
var taxBrackets = {};

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

function getUserList(callback){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   
    client.query('SELECT * FROM personal_data', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
       	console.log("inFunc:"+result.rows);
       	callback(null, result.rows); }
    });
	   
	});
}


app.get('/', function(request, response) {


	getUserList(function(err,data){
		users = data;
	});
    console.log("callingFunc:"+users);
	response.render('test', {database: users});

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
