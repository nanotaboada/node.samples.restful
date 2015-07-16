var gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    mocha = require("gulp-mocha");

gulp.task("lint", function () {
    gulp.src("server/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task("test", function () {
    return gulp.src("test/**/*.js", {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});

gulp.task("default", function() {
    gulp.start("lint", "test");
});

// var watcher = gulp.watch("server/**/*.js", ["lint"]);
// watcher.on("change", function(event) {
//     console.log("File " + event.path + " was " + event.type + ", running tasks...");
// });
