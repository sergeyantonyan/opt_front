(function () {
    'use strict';

    let path = require('path');
    let gulp = require('gulp');
    let conf = require('./conf');
    let browserSync = require('browser-sync');

    function isOnlyChange(event) {
        return event.type === 'changed';
    }

    gulp.task('watch', ['inject'], function () {

        gulp.watch([path.join(conf.paths.src, '/*.html')], ['inject-reload']);

        gulp.watch([
            path.join(conf.paths.src, '/**/*.css'),
            path.join(conf.paths.src, '/**/*.scss')
        ], function(event) {
            if(isOnlyChange(event)) {
                gulp.start('styles-reload');
            } else {
                gulp.start('inject-reload');
            }
        });

        gulp.watch(path.join(conf.paths.src, '/**/*.js'), function(event) {
            if(isOnlyChange(event)) {
                gulp.start('scripts-reload');
            } else {
                gulp.start('inject-reload');
            }
        });

        gulp.watch(path.join(conf.paths.src, '/*.html'), function(event) {
            browserSync.reload(event.path);
        });
    });

})();