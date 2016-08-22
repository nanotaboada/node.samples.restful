var gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    mocha = require("gulp-mocha");

gulp.task("lint", function () {
    gulp.src("controllers/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task("test", function () {
    return gulp.src("test/**/*.js", {read: false})
    .pipe(mocha());
});

gulp.task("default", function() {
    gulp.start("lint", "test");
});
