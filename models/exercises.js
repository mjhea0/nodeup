var mongoose = require('mongoose');

// create the exercise model
var Exercise = mongoose.model('exercises', {
  name: String,
  slug: String,
  difficulty: String,
  created: Date
});

module.exports = Exercise;