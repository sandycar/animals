var express = require('express');
var app = express();

app.use(express.static("public"));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'codingIsfun',
  database : 'animals_db'
});
 
connection.connect();

//is there a route that will always get hit
// app.get('*', function(req, res, next){
// 	connection.query('INSERT INTO page_views',function (error, results, fields) {
// 	  next();
// 	});
// });

app.get('/animals.json', function(req, res){
	connection.query('SELECT * FROM animals', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

// http://localhost:3001/actors-insert?actor_name=bobbi

app.get('/animals-insert', function(req, res){
	connection.query('INSERT INTO animals (animal_name) VALUES (?)', [req.query.animal_name],function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json({
	  	message: 'success'
	  });
	});
});

// http://localhost:3001/actors-delete?cat_id=3
// what will the delete route look like in this app.js file
app.get('/animals-delete', function(req, res){
	connection.query('DELETE FROM animals WHERE id = (?)', [req.query.animal_id],function (error, results, fields) {
	  
	  res.redirect('/');
	
	});
});

// one way
	// http://localhost:3001/actors-update/6?actor_name=tom%20cruz
	app.get('/animals-update/:id', function(req, res){
		connection.query('UPDATE animals SET animal_name = (?) WHERE id = (?)', [req.query.animal_name, req.params.id],function (error, results, fields) {
		  
		  res.redirect('/');
		
		});
	});

// another way
	// http://localhost:3001/cats-update?cat_name=dragon&cat_id=4
	// app.get('/cats-update', function(req, res){
	// 	connection.query('UPDATE cats SET cat_name = (?) WHERE id = (?)', [req.query.cat_name, req.query.cat_id],function (error, results, fields) {
		  
	// 	  res.redirect('/');
		
	// 	});
	// });

//so if the user hits a route that does not exist then redirec them to the home page
app.get('*', function(req, res){
	res.redirect('/')
});

app.listen(3001, function(){
	console.log('listening on 3001');
});






