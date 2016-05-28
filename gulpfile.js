var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var jade        = require('gulp-jade');
var concat      = require('gulp-concat');

var reload      = browserSync.reload;


/** ======== PATHS ======== **/

var src = {
      scss: './src/scss/**',
      jade: './src/jade/**/*.jade',
      js:   './src/js/*.js'
};
var dest = {
      css:   './build/css',
      html:  './build',
      js: './build/js'
};

/** ======== PLAYGROUND ======== **/

/** Browsersync server */
gulp.task('serve', ['sass', 'jade', 'scripts'], function() {
    browserSync({
        server: {baseDir: 'build'},
        notify: false 
    });
});


/** Sass from src folder to build folder **/
gulp.task('sass', function () {
  return gulp
    .src(src.scss)
    .pipe(sass())
    .pipe(prefix(['last 5 versions', '> 1%', 'ie >= 8'], { cascade: true }))
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.reload({stream:true}))
});


/** Concat JS files from src folder to build folder **/
gulp.task('scripts', function(){
  return gulp
    .src(['./src/js/jquery-2.2.4.min.js', './src/js/functions.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dest.js))
});


/** Compiles JADE files from src folder to HTML build folder **/
gulp.task('jade', function(){
  return gulp
    .src(src.jade)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(dest.html))
});
/** IMPORTANT!! Separate task for the reaction to JADE files **/
gulp.task('jade-watch', ['jade'], reload);


/** Watch sass, jade files for changes & recompile **/
gulp.task('watch', function() {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js, ['scripts']);
  gulp.watch(src.jade, ['jade-watch']);
});

/** Gulp default task **/
gulp.task('default', ['serve', 'watch']);