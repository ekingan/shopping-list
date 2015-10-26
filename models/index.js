var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/shopping-list' // plug in the db name you've been using
);

// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("db is open for business");
});

module.exports.Item = require('./items.js');
module.exports.User = require('./users.js');