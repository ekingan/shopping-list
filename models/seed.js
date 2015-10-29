var mongoose = require("mongoose");
var db = require("./index");




var fakeItems = [];
fakeItems.push( {
	name: 'kale',
	shelfLife: 60000,
	purchasedAt: null,
	expiresAt: null
// 		user: {type: String, ref: 'User'}
}, {
	name: 'peanut butter',
	shelfLife: 6000000,
	purchasedAt: null,
	expiresAt: null

}, {
	name: 'apples',
	shelfLife: 6000000,
	purchasedAt: null,
	expiresAt: null

});


for(var i=0; i < fakeItems.length; i++) {

	db.Items.create(fakeItems[i], function(item) {
		console.log(anItem.name, ' has been added to the db');
		res.json(item);
	});
}