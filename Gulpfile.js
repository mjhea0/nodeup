// 'use strict'

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');


gulp.task('jshint', function() {
  gulp.src(['app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
  livereload.listen(); // is this working?
});

gulp.task('default', function() {
  nodemon({ script: './bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('start', ['watch'])
    .on('change', ['jshint', 'watch'])
    .on('restart', function () {
        console.log('restarted!');
    });
});