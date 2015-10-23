'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const jade = require('gulp-jade');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const sequence = require('gulp-sequence');
const source = require('vinyl-source-stream');

gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/**/*.js', ['build:js']);
    gulp.watch('./src/**/*.less', ['build:css']);
    gulp.watch('./dist/*.js', browserSync.reload);
    gulp.watch('./dist/*.css', browserSync.reload);
});

gulp.task('build:js', function() {
    return browserify({
        entries: "./src/components/app.js",
        debug: true,
        transform: [babelify]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function() {
    gulp.src('./src/stylesheets/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});
