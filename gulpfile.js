'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var paths = {
  scripts: ['!./node_modules/**/*.*', './**/*.js'],
  tests: 'test/**/*.js'
};

gulp.task('lint', function () {
  gulp
  .src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {
  gulp
  .src(paths.tests)
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['test']);
