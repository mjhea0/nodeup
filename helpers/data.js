// helpers working with mongo

var Exercise = require('../models/exercises.js');

var createExercises = function(exerciseArray) {

  for( var i=0, l=exerciseArray.length; i<l; i++ ) {
    findThenCreate(exerciseArray[i]);
  }

};

function findThenCreate(exerciseObject) {

  var exerciseName = exerciseObject.name;

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

}

module.exports = createExercises;



