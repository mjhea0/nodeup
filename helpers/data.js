// helpers for creating database data

var Exercise = require('../models/exercises.js');

var createExercises = function() {

  var nameOne = "fizz buzz fizz";

  Exercise.findOne({ name: nameOne }, function(err, exercise) {
      if(err) { console.log(err); }
      if (!err && exercise === null) {
        exerciseOne = new Exercise({
          name: nameOne,
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
      }
  });

};

module.exports = createExercises;



