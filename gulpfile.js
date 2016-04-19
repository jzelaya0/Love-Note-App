var gulp          = require('gulp');
var uglify        = require('gulp-uglify');
var ngAnnotate    = require('gulp-ng-annotate');
var concat        = require('gulp-concat');
var jshint        = require('gulp-jshint');
var stylus        = require('gulp-stylus');
var rename        = require('gulp-rename');
var nodemon       = require('gulp-nodemon');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var browserSync   = require('browser-sync').create();
var config        = require('./config');


// PATHS
// ====================================
var output = {
  angularApp : "public/app",
  cssBuild : "public/assets/css"
};


// DEFAULT TASK
// ====================================
gulp.task('default', ['nodemon']);


// Main Angluar app
gulp.task('angularApp', function(){
  return gulp.src('src/app/**/*js')
    .pipe(jshint())
    .pipe(notify(function(file){
      if(file.jshint.success) {
        //Don't report anything if it's all good
        return false;
      }
      var errors = file.jshint.results.map(function(data){
        if (data.error) {
          return "(" + data.error.line + data.error.character + ")" + data.error.reason;
        }
      }).join("\n");

      return file.relative + "(" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(ngAnnotate())
    .pipe(concat('angular.app.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(output.angularApp));
});

// Angular views
gulp.task('angularViews', function(){
  return gulp.src('src/app/views/*html')
    .pipe(gulp.dest('public/app/views/templates'));
});

// Stylus Task
gulp.task('stylusBuild', function(){
  return gulp.src('src/assets/styles/main.styl')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(output.cssBuild))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Browser Sync
gulp.task('browserSync', function(){
  browserSync.init(null, {
    files: ["./public/**/*.*"],
    proxy: 'localhost:3000'
  });
});


// Watch all tasks
gulp.task('watch',['browserSync'], function(){
  gulp.watch('src/app/**/*.js', ["angularApp"]);
  gulp.watch('src/app/views/*html', ["angularViews"]);
  gulp.watch('src/assets/styles/*.styl', ['stylusBuild']);
});


// Start nodemon server
gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js',
    ext: 'js styl html'
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function(){
      console.log('Server has restarted!');
    });
});
