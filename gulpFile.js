var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;
var browserSync = require('browser-sync').create();


var paths = {
  src: {
    scripts: ['app/**/*.js'],
    html: ['app/**/*.html', 'app/index.html'],
    styles: ['app/app.css']
  },

  test: ['specs/**/*.js'],
  server: 'server/server.js'
};


gulp.task('build-js', ['clean'], function() {  
  var b = browserify({
    entries: 'app/app.js',
    debug: true,
    paths: ['app/mainView', 'app/services'],
    transform: [ngAnnotate]
  });

  return b.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(cachebust.resources())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('app'));
  });


