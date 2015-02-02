// helpers for creating database database data

var Exercise = require('../models/exercises.js');

var createExercises = function() {

  exerciseOne = new Exercise({
    name: "fizz buzz fizz",
    difficulty: "hard",
    created: Date.now(),
    url: "N/A"
  });
  exerciseOne.save(function(err, exerciseOne) {
      if(err) {
        console.log(err);
      } else {
        console.log("saving exercise...");
      }
  });

};

module.exports = createExercises;