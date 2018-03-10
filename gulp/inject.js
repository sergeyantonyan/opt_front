(function () {

    'use strict';

    let path = require('path');
    let gulp = require('gulp');
    let conf = require('./conf');
    let plugins = require('gulp-load-plugins')();
    let browserSync = require('browser-sync');

    gulp.task('inject-reload', ['inject'], function() {
        browserSync.reload();
    });

    function injectTask () {
        let injectStyles = gulp.src([
            path.join(conf.paths.tmp, '/serve/styles/**/*.css')
        ], {read: false});

        let injectScripts = gulp.src([
            path.join(conf.paths.tmp, '/serve/js/**/*.js')
        ]);


        let injectOptions = {
            ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
            addRootSlash: false
        };

        return gulp.src(path.join(conf.paths.src, '/*.html'))
            .pipe(plugins.inject(injectStyles, injectOptions))
            .pipe(plugins.inject(injectScripts, injectOptions))
            .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
    }

    gulp.task('inject', ['scripts', 'styles'], injectTask);

})();