var gulp = require('gulp');
var uglify = require('gulp-uglify');

// PATHS
// ====================================
var output = {
  angularApp : "public/app"
};


// DEFAULT TASK
// ====================================
gulp.task('default', ['watch']);


gulp.task('angularApp', function(){
  return gulp.src('src/app/app.js')
    .pipe(uglify())
    .pipe(gulp.dest(output.angularApp));
});


gulp.task('watch', function(){
  gulp.watch('src/app/app.js', ["angularApp"]);
})
