const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const browserSync = require('browser-sync');
const plugins = require('gulp-load-plugins')();
const browserify = require('gulp-browserify');


(function () {
    'use strict';


    gulp.task('scripts-reload', function () {
        return buildScripts()
            .pipe(browserSync.stream());
    });

    function scriptsTask() {
        return buildScripts();
    }

    function buildScripts() {
        gulp.src(path.join(conf.paths.src, '/**/*.js'))
            .pipe(browserify({
                debug: true,
                transform: ['babelify']
            }))
            .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

        return gulp.src(path.join(conf.paths.src, '/**/*.js'))
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format())
            .pipe(plugins.size());
    }

    gulp.task('scripts', scriptsTask);
})();
