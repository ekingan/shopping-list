// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var db = require("./models/index");


//MIDDLEWARE
app.set("view engine", "ejs");

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
	db.Item.find({}, function (err, items){
		if (err){
			console.log("error getting items from db");
		}
		console.log("these are the items, ", items);
		res.render("index", {items: items});
		});
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

//POST ROUTE 
//create new list of items
app.post('/items', function (req, res){
	console.log(req.body);
	db.Item.create(req.body, function (err, item){
		if (err){
			console.log("failed to create new item");
		}
		res.json(item);
	});
});

//create new user
app.post('/users', function (req, res){
	var user = req.body;
	db.User.createSecure(user.email, user.password, function (err, user){
		req.session.userID = user._id;
		res.json({user: user, msg: "user created"});
	});
});

//check user is correct
app.post('/login', function (req, res){
	var user = req.body;
	db.User.authenticate(user.email, user.password, function (err, user){
		if (err) {
			console.log("there was an err " , err);
		} 
		req.session.user = user;
		res.json(user);
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
// item.purchasedAt.getMilliseconds() + item.shelfLife
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
	req.session.userId = null;
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



//UPDATE
//SHOW


app.listen(3000, function() {
  console.log("shopping list is running on port 3000");
});

