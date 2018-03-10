'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const browserSync = require('browser-sync');


function browserSyncInit (baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  let server = {
    baseDir: baseDir
  };


  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    open: process.env.PORT ? false : true,
    notify: process.env.PORT ? false : true,
    ghostMode: false,
    port: process.env.PORT || 3000,
    browser: browser
  });
}

gulp.task('serve', ['watch', 'images', 'fonts'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.favicons, conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});
