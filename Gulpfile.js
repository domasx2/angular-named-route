var gulp = require('gulp'),
    concat = require('gulp-concat'),
    lint = require('gulp-jslint'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'),
    SOURCES = 'src/**/*.js';


gulp.task('cleanDist', function(cb) {
    del(['dist/*'], cb);
});


gulp.task('build', ['lint', 'cleanDist'], function () {
    return gulp.src(['src/named-route-module.js', SOURCES])
        .pipe(ngAnnotate())
        .pipe(concat('angular-named-route.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    return gulp.src(SOURCES)
        .pipe(lint({
            global: ['angular'],
            browser: true,
            devel: true,
            todo: true,
            noempty: false,
            plusplus: true,
            unparam: true //I like to include all callback params even if they're not used
        }));
});