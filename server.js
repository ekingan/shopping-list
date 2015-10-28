// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var db = require("./models/index");
var request = require('request');
var dotenv = require('dotenv').load();
var FOOD_API_KEY = process.env.FOOD_API_KEY;
var recipes;
var cookieParser = require('cookie-parser');
var requestOptions = {};


//MIDDLEWARE
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	saveUninitialized: true,
	resave: true, 
	secret: 'SuperSecretCookie',
	cookie: {maxAge: 600000}
}));


//GET ROUTES
//for index
app.get('/', function (req, res) {
	if(req.session.user ) {
		db.Item.find({user: req.session.user._id}, function (err, items){ // user: req.session.user._id
			if (err){
				console.log("error getting items from db");
			}
			
			res.render("index", {items: items});
		});
	} else {
				res.render('splash');
		// res.render('index', {items: [{name: 'strawberries'}, {name: 'peaches'}, {name: 'bacon'}]}); //put fake items

	}
});




app.get('/recipe', function (req, res) {

	db.Item.find({user: req.session.user}, function (err, items){
		// console.log(req.session.user._id);
		if (err) {
			console.log("error getting items from db");
		} else {

			itemNames = [];
			var d = new Date();
			var timeNow = d.getTime();
			items.forEach(function (item) {
				console.log("in for each function")
				var timeLeft = item.expiresAt - timeNow;

				
				if (timeLeft < 1209600000) {  //4 days 518820000000 342533850
					var itemName = item.name;
					console.log(itemName);
					itemNames.push(itemName);
					console.log("this is item names 1: ", itemNames);
				}	else {
					console.log("timeLeft was more than 1209600000: ", timeLeft);
				}
			});

			request('http://food2fork.com/api/search?key='+FOOD_API_KEY+'&q=' +  itemNames + '' , function(error, response, body) {
				if (!error && response.statusCode == 200){
						console.log("this is item names 2: ", itemNames);
						var recipes = JSON.parse(body).recipes;
						console.log("this is recipes: " , recipes);
						console.log(recipes.length);
						res.render('recipe', { recipes: recipes });	
					} else {
						res.send("request failed");
					}
				});	

		}
	});
});


//POST ROUTE 
//create new list of items
app.post('/items', function (req, res){
	var item = req.body;
	console.log(req.body);
	console.log(req.session.user._id);
	item.user = req.session.user._id;

	db.Item.create(item, function (err, item){
		if (err){
			console.log("failed to create new item");
		}
		console.log(item);
		res.json(item);
	});

});



//create new user
app.post('/users', function (req, res){
	var user = req.body;
	db.User.createSecure(user.email, user.password, function (err, user){
		req.session.user = user;
		res.json({user: user, msg: "user created"});
	});
});

//check user is correct
app.post('/login', function (req, res){
	var user = req.body;
	db.User.authenticate(user.email, user.password, function (err, user){
		if (err) {
			console.log("there was an err " , err);
			res.json({err: err});
		} else {
			req.session.user = user;
			res.json(user);
		}
	});
});



//create new time stamp, and expiration date
app.get('/items/:id/purchase', function (req, res){
	db.Item.findById(req.params.id, function (err, item){
		if (err){
			console.log("error adding purchase date");
		} else {
			
			item.purchasedAt = new Date().getTime();
			
			item.expiresAt = (item.purchasedAt + item.shelfLife);

			item.save();
			res.json(item);
			
		}
	});
});

//get signup
app.get('/signup', function (req, res) {
	res.render('signup');
});
//get login
app.get('/login', function (req, res) {
	res.render('login');
});
//get current user
app.get('/current-user', function (req, res) {
	res.json({ user: req.session.user});
});
//logout user
app.get('/logout', function (req, res){
	req.session.user = null;
	res.json({ msg: 'User logged out successfully'});
});




//DELETE
app.delete('/items/:id', function (req, res){
	console.log(req.params);
	db.Item.remove({_id: req.params.id}, function (err, item){
		console.log("item deleted");

		res.json(item);
	});
});



app.listen(process.env.PORT || 3000, function() {
	console.log("shopping list is running on port 3000");
});

