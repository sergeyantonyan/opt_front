(function () {
    'use strict';

    const path = require('path');
    const gulp = require('gulp');
    const conf = require('./conf');
    const plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'uglify-save-license', 'del']
    });

    function htmlTask() {

        let htmlFilter = plugins.filter('*.html', {restore: true, dot: true});
        let jsFilter = plugins.filter('**/*.js', {restore: true, dot: true});
        let cssFilter = plugins.filter('**/*.css', {restore: true, dot: true});

        return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'), { ignorePath: conf.paths.tmp, addRootSlash: false })
            .pipe(plugins.useref())
            .pipe(jsFilter)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.browserify({
                debug: true,
                transform: ['babelify']
            }))
            .pipe(plugins.uglify({preserveComments: plugins.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
            .pipe(plugins.rev())
            // .pipe(plugins.sourcemaps.write('maps'))
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe(plugins.rev())
            .pipe(plugins.sourcemaps.write('maps'))
            .pipe(cssFilter.restore)
            .pipe(plugins.revReplace())
            .pipe(plugins.sourcemaps.write('maps'))
            .pipe(htmlFilter)
            .pipe(plugins.htmlmin({
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }))
            .pipe(htmlFilter.restore)
            .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
            .pipe(plugins.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
    }


    gulp.task('other', function () {
        var fileFilter = plugins.filter(function (file) {
            return file.stat.isFile();
        });

        return gulp.src([
            path.join(conf.paths.favicons, '/**/*'),
            path.join(conf.paths.src, '/_assets/**/*'),
            path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
        ])
            .pipe(fileFilter)
            .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
    });

    gulp.task('clean', function () {
        return plugins.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
    });

    gulp.task('html', ['inject'], htmlTask);

    gulp.task('build', ['html', 'images', 'other']);

})();