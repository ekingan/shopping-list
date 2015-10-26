var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
		name: String,
		shelfLife: Number,
		purchasedAt: Number,
		expiresAt: Number,
		user: {type: String, ref: 'User'}
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
