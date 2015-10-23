// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models/index");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//GET ROUTES
//for index
app.get('/', function (req, res) {
	db.Item.find({}, function (err, items){
		if (err){
			console.log("error getting items from db");
		}
		console.log("these are the items, ", items);
		res.render("index", {items: items});
		});
	// var items = [
	// 		{name: 'apples'},
	// 		{name: 'coffee'},
	// 		{name: 'pumpkin'} 
			
	// 		];
  
});

// TODO: do we need this?  delete?
app.get('/items', function (req, res) {
	db.Item.find({}, function (err, item) {
		if (err) {
			console.log("error getting items from DB");
			}
		res.json(item); 
	});
});

//POST ROUTE - create new list of items
app.post('/items', function (req, res){
	console.log(req.body);
	db.Item.create(req.body, function (err, item){
		if (err){
			console.log("failed to create new item");
		}
		res.json(item);
	});
});

app.get('/items/:id', function (req, res){
	var item = item[req.params.id]; 
	res.render('/', {items: items});
});

//DELETE
app.delete('/items/:id', function (req, res){
	console.log(req.params);
	db.Item.remove({_id: req.params.id}, function (err, item){
		console.log("item deleted");

		res.json(item);
	});
});


//UPDATE
//SHOW


app.listen(3000, function() {
  console.log("shopping list is running on port 3000");
});

