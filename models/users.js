var mongoose = require('mongoose');
		bcrypt = require('bcrypt');
		salt = bcrypt.genSaltSync(10);

var userSchema = mongoose.Schema({
		email: String,
		passwordDigest: String
	
});

userSchema.statics.createSecure = function (email, password, callback){
var user = this;
bcrypt.genSalt(function (err, salt){
	bcrypt.hash(password, salt, function (err, hash) {
		console.log(hash);

		user.create({
			email: email,
			passwordDigest: hash
		}, callback);
	});
});
};


var User = mongoose.model('User', userSchema);

module.exports = User;

