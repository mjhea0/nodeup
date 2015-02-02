var mongoose = require('mongoose');

// create the exercise model
var Exercise = mongoose.model('exercises', {
  name: String,
  difficulty: String,
  created: Date,
  solutions: [String]
});

module.exports = Exercise;