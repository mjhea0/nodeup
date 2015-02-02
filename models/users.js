var mongoose = require('mongoose');

// create the user model
var User = mongoose.model('users', {
  oauthID: Number,
  name: String,
  created: Date,
  token: String
});

module.exports = User;