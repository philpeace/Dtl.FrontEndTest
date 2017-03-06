/// <binding Clean='clean' ProjectOpened='default' />

'use strict';

var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');

var webroot = './wwwroot/';

var paths = {
    jsFolder: webroot + 'js/',
    js: webroot + 'js/*.js',
    minJs: webroot + 'js/**/*.min.js',
    mapJs: webroot + 'js/*.js.map',
    cssFiles: webroot + 'css/*.css',
    css: webroot + 'css',
    mapCss: webroot + 'css/maps/*.css.map',
    less: webroot + 'less/site.less',
    lessFolder: webroot + 'less/**/*.less',
    concatJsDest: webroot + 'js/site.min.js',
    concatCssDest: webroot + 'css/site.css',
    lib: webroot + 'lib/'
};

//clean js files
gulp.task('clean:js', function () {
    gulp.src([paths.minJs, paths.mapJs], { read: false })
        .pipe(rimraf({ force: true }));
});

//minify js
gulp.task('min:js', function () {
    gulp.src([paths.js, '!' + paths.minJs])
        .pipe(plumber())
        .pipe(uglify({ mangle: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.jsFolder));
});

//clean css
gulp.task('clean:css', function () {
    gulp.src([paths.cssFiles, paths.mapCss], { read: false })
        .pipe(rimraf({ force: true }));
});

//compile less files
gulp.task('less', function () {
    gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less({ compress: false }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(paths.css));
});

//minify css
gulp.task('min:css', ['less'], function () {
    gulp.src(paths.concatCssDest)
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});

gulp.task('css', ['clean:css', 'min:css'], function () { });

gulp.task('js', ['clean:js', 'min:js'], function () { });

gulp.task('default', ['onbuild', 'watch'], function () { });

gulp.task('clean', ['clean:css', 'clean:js'], function () { });

gulp.task('onbuild', ['css', 'js'], function () { });

gulp.task('watch', function () {
    gulp.watch([paths.js, '!' + paths.minJs], ['min:js']);
    gulp.watch([paths.lessFolder], ['css']);
});
