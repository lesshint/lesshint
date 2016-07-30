var gulp = require('gulp');
var istanbul = require('gulp-istanbul');

gulp.task('lint', function () {
    var eslint = require('gulp-eslint');

    return gulp.src(['./lib/**/*.js', './test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('coverage', ['lint'], function () {
    return gulp.src(['./lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function () {
    var mocha = require('gulp-mocha');

    return gulp.src(['./test/specs/**/*.js', '!./test/specs/util.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: 95
            }
        }));
});

gulp.task('coveralls', ['test'], function () {
    var coveralls = require('gulp-coveralls');

    return gulp.src('./coverage/lcov.info')
        .pipe(coveralls());
});

gulp.task('default', ['test']);
