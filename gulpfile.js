var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    codacy = require('gulp-codacy');

gulp.task('lint', function () {
    gulp.src('controllers/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('cover', function () {
  return gulp.src(['controllers/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()); // Force `require` to return covered files
});

gulp.task('test', ['cover'], function () {
    return gulp.src('test/*.js', { read: false })
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    // .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }));
});

gulp.task('coverage', ['test'], function codacyTask() {
  return gulp
    .src(['coverage/lcov.info'], { read: false })
    .pipe(codacy({
      token: process.env.CODACY_PROJECT_TOKEN
    }))
  ;
});

gulp.task('default', function() {
    gulp.start('lint', 'test');
});
