var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

//
// task for previewing stuff in dist folder
//
gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });
});

//
// clean up before starting, delete dist folder
//
gulp.task('deleteDistFolder', function() {
  return del("./docs");
});

//
// include here other files that need to copien to dist
//
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return gulp.src(pathsToCopy)
      .pipe(gulp.dest("./docs"));
});

//
// compress image files with imagemin and copy to dist/assets/images
//
gulp.task('optimizaImages', ['deleteDistFolder'], function() {
  return gulp.src(["./app/assets/images/**/*"])
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      }))
      .pipe(gulp.dest("./docs/assets/images"));
})

//
// - in index file, add comment for *.js *.css files -> usemin will watch them
// - for js/ccs do rev and compressing (rev creates a random name for files)
// - copy js/css to /dist/assets/styles and /dist/assets/scripts
//
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
      .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
      }))
      .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizaImages', 'usemin']);
