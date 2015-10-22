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
	var items = [
			{name: 'apples', expired: false}, 
			{name: 'coffee', expired: false},
			{name: 'peanut butter', expired: false}
			];
  res.render("index", {items: items});
});

//POST ROUTE - create new list of items
app.post('/items', function (req, res){
	var item = req.body.item;
	items.push(item);
	res.status(200).json(item);
});

app.get('/items/:id', function (req, res){
	var item = item[req.params.id]; 
	res.render('/', {items: items});
});
//DELETE
//UPDATE
//SHOW


app.listen(3000, function() {
  console.log("shopping list is running on port 3000");
});

