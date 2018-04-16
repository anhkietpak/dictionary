var express = require('express');
var nano = require('nano')('http://localhost:5984');
var prom = require('nano-promises');
var fruits = nano.db.use("fruits");
var app = express();

function getFruits(db) {
	var listOfFruits = ["test"];
	db.list(function(err, body) {
		if (!err) {
			body.rows.forEach(function(doc) {
				db.get(doc.id, function(err, body) {
					if (body.name) {
						//console.log(body.name);
						listOfFruits.push(body.name);
						console.log(listOfFruits);
					};
				});
			});
		};
	})
	return listOfFruits;
}

app.get('/', function(request, response) {
	response.send(getFruits(fruits));
});

var server = app.listen(3000, function() {
	console.log("Running on port 3000")
});