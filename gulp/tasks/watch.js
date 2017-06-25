var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch-files', function(){

  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function(){
    browserSync.reload();
  });


  watch('./app/assets/styles/**/*.css', function(){
    gulp.start('injectCss');
  });

});

gulp.task('injectCss', ['styles'], function(){
return gulp.src('./app/temp/styles/style.css')
  .pipe(browserSync.stream());
});
