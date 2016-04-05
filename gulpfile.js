var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat     = require('gulp-concat');
var jshint     = require('gulp-jshint');
var stylus     = require('gulp-stylus');
var rename     = require('gulp-rename');
var nodemon    = require('gulp-nodemon');
var notify     = require('gulp-notify');
var plubmer    = require('gulp-plumber');

// PATHS
// ====================================
var output = {
  angularApp : "public/app",
  angularControllers : "public/app/controllers/",
  angularServices: "public/app/services",
  cssBuild : "public/assets/css"
};


// DEFAULT TASK
// ====================================
gulp.task('default', ['nodemon']);


// Main Angluar app
gulp.task('angularApp', function(){
  return gulp.src('src/app/*js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(ngAnnotate())
    .pipe(rename({
      suffix: '.min'
    }))
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

//Angular services
gulp.task('angularServices', function(){
  return gulp.src('src/app/services/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(ngAnnotate())
    .pipe(concat('services.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.angularServices));
});

// Angular views
gulp.task('angularViews', function(){
  return gulp.src('src/app/views/*html')
    .pipe(gulp.dest('public/app/views/templates'));
});

// Stylus Task
gulp.task('stylusBuild', function(){
  return gulp.src('src/assets/styles/main.styl')
    .pipe(plubmer({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(output.cssBuild));
});

// Watch all tasks
gulp.task('watch', function(){
  gulp.watch('src/app/*.js', ["angularApp"]);
  gulp.watch('src/app/controllers/*js', ["angularControllers"]);
  gulp.watch('src/app/services/*js', ["angularServices"]);
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
