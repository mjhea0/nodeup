var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');


gulp.task('jshint', function() {
    gulp.src(['app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('default', function() {
    nodemon({ script: './bin/www', ext: 'html js', ignore: ['ignored.js'] })
        .on('change', ['jshint'])
        .on('restart', function () {
            console.log('restarted!');
        });
});