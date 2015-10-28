var mongoose = require('mongoose');
		bcrypt = require('bcrypt');
		salt = bcrypt.genSaltSync(10);

var userSchema = mongoose.Schema({
		email: String,
		passwordDigest: { type: String, required: true }
	
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

userSchema.statics.authenticate = function (email, password, callback) {
	this.findOne({email: email}, function (err, user) {
		if (!user) {
			console.log('No user with email: ' + email, null);
			callback("No user found", null);
		} else if (user.checkPassword(password)) {
			callback (null, user);
		}
	});
};

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};


var User = mongoose.model('User', userSchema);

module.exports = User;

