// helpers working with mongo

var Exercise = require('../models/exercises.js');

var createExercises = function(exerciseArray) {

  exerciseArray.forEach(function(exerciseName) {

    Exercise.findOne({ name: exerciseName }, function(err, exercise) {
      if(err) { console.log(err); }
      if (!err && exercise === null) {
        newExercise = new Exercise({
          name: exerciseName,
          slug: exerciseName.replace(/\s/g, ''),
          difficulty: "hard",
          created: Date.now()
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



