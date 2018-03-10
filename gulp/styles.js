(function () {
    'use strict';

    const path = require('path');
    const gulp = require('gulp');
    const conf = require('./conf');
    const plugins = require('gulp-load-plugins')();
    const browserSync = require('browser-sync');

    let buildStyles = function () {
        let sassOptions = {
            style: 'compressed',
            outputStyle: 'compressed',
            includePaths: [
                'node_modules/bootstrap/scss'
            ]
        };

        let injectFiles = gulp.src([
            path.join(conf.paths.src, '/_assets/stylesheets/**/*.scss'),
            path.join('!' + conf.paths.src, '/_assets/stylesheets/index.scss')
        ], {read: false});

        let injectOptions = {
            transform: function (filePath) {
                filePath = filePath.replace(conf.paths.src + '/_assets/stylesheets/', '');
                //do not import .scss file starting with _
                if (path.basename(filePath).indexOf('_') === 0) {
                    return '';
                }
                return '@import "' + filePath + '";';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };


        return gulp.src([
            path.join(conf.paths.src, '/_assets/stylesheets/index.scss')
        ])
            .pipe(plugins.inject(injectFiles, injectOptions))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
            .pipe(plugins.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
    };

    gulp.task('styles-reload', ['styles'], function () {
        return buildStyles()
            .pipe(browserSync.stream());
    });

    gulp.task('styles', function () {
        return buildStyles();
    });
})();