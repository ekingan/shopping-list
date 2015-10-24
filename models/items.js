var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
		name: String,
		shelfLife: Number,
		purchasedAt: Date,
		expiresAt: Date
		// updated: { type: Date, default: Date.now },
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
