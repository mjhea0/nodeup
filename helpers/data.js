// helpers for creating database data

var Exercise = require('../models/exercises.js');

var createExercises = function(exerciseArray) {

  exerciseArray.forEach(function(exerciseName) {

    Exercise.findOne({ name: exerciseName }, function(err, exercise) {
      if(err) { console.log(err); }
      if (!err && exercise === null) {
        newExercise = new Exercise({
          name: exerciseName,
          difficulty: "hard",
          created: Date.now(),
          url: "N/A"
        });
        newExercise.save(function(err, newExercise) {
          if(err) {
            console.log(err);
          } else {
            console.log("saving exercise...");
          }
        });
      }
    });

  });

  };

module.exports = createExercises;



