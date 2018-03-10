'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');


// move fonts
gulp.task('fonts', function() {
  return gulp.src('./src/_assets/fonts/**/*')
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/fonts')))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts')));
});
