var gulp = require('gulp');
var istanbul = require('gulp-istanbul');

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    var jscs = require('gulp-jscs');

    return gulp.src(['./lib/**/*.js', './test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

gulp.task('coverage', function () {
    return gulp.src(['./lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['lint', 'coverage'], function () {
    var mocha = require('gulp-mocha');

    return gulp.src(['./test/specs/**/*.js'])
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
})

gulp.task('default', ['test']);
