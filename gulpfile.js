var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat     = require('gulp-concat');
var jshint     = require('gulp-jshint');

// PATHS
// ====================================
var output = {
  angularApp : "public/app",
  angularControllers: "public/app/controllers/"
};


// DEFAULT TASK
// ====================================
gulp.task('default', ['watch']);


// Main Angluar app
gulp.task('angularApp', function(){
  return gulp.src('src/app/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(output.angularApp));
});

// Angular controllers
gulp.task('angularControllers', function(){
  return gulp.src('src/app/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(ngAnnotate())
    .pipe(concat('controllers.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.angularControllers));
});

gulp.task('watch', function(){
  gulp.watch('src/app/app.js', ["angularApp"]);
  gulp.watch('src/app/controllers/*js', ["angularControllers"]);
});
