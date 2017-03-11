/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    exec = require('child_process').exec;


gulp.task("karma", function(cb) {
   return exec('karma start "karma.conf.js"',
        function(error) {
           cb(error);
        }
    );
});