var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
		name: String,
		time: Date, 
		updated: { type: Date, default: Date.now },
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
