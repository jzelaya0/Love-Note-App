var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat     = require('gulp-concat');
var jshint     = require('gulp-jshint');
var stylus     = require('gulp-stylus');
var rename     = require('gulp-rename')

// PATHS
// ====================================
var output = {
  angularApp : "public/app",
  angularControllers : "public/app/controllers/",
  cssBuild : "public/assets/css"
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
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.angularApp));
});

// Angular controllers
gulp.task('angularControllers', function(){
  return gulp.src('src/app/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(ngAnnotate())
    .pipe(concat('controllers.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.angularControllers));
});

// Stylus Task
gulp.task('stylusBuild', function(){
  return gulp.src('src/assets/styles/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(output.cssBuild));
});

// Watch all tasks
gulp.task('watch', function(){
  gulp.watch('src/app/app.js', ["angularApp"]);
  gulp.watch('src/app/controllers/*js', ["angularControllers"]);
  gulp.watch('src/assets/styles/*.styl', ['stylusBuild']);
});
