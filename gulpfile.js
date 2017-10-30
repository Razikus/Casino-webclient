var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var connect = require('gulp-connect');

function compile(watch) {
  var bundler = null;
  if(watch) {
    bundler = watchify(browserify('./src/js/app.js', { debug: true }).transform(babel.configure( {
                presets: ["es2015"]
              })));
  } else {
    bundler = browserify('./src/js/app.js', { debug: true }).transform(babel.configure( {
                presets: ["es2015"]
              }));
  }
  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'))
      .pipe(connect.reload());
  }
  if (watch) {
    bundler.on('update', function() {
      rebundle();
    });
  }
  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 7171,
  });
});

function watchStatic() {
  return gulp.watch('./src/static/**/*', function(obj){
    console.log(obj.type);
    if( obj.type === 'changed') {
      gulp.src( obj.path, { "base": "./src/static/"})
      .pipe(gulp.dest('./build'));
    }
  });
}

gulp.task('build', function() {
  gulp.src(['src/static/**'])
  .pipe(gulp.dest('build'));
  compile(false);
});
gulp.task('watch', function() { return watch(); });
gulp.task('buildChange', function() {
    gulp.watch('./build/**/*', ['watch']);
});

gulp.task('staticChange', function() {
  return watchStatic();
});

gulp.task('default', ['watch', 'webserver', 'staticChange']);
