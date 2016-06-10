var gulp        = require('gulp');
var concat      = require('gulp-concat');
var prefix      = require('gulp-autoprefixer');
var brfs        = require('brfs');
var envify      = require('envify');
var browserify  = require('browserify');
var istanbul    = require('browserify-babel-istanbul');
var ngAnnotate  = require('browserify-ngannotate');
var source      = require("vinyl-source-stream");
var destAtomic  = require('gulp-dest-atomic');
var glob        = require('glob');
var gzip        = require('gulp-gzip');
var gutil       = require('gulp-util');
var eslint      = require('gulp-eslint');
var base64      = require('gulp-base64');
var svgmin      = require('gulp-svgmin');
var KarmaServer = require('karma').Server;
var watch       = require('gulp-watch');
var usemin      = require('gulp-usemin');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var rev         = require('gulp-rev');
var connect     = require('gulp-connect');
var clean       = require('gulp-clean');
var notify      = require('gulp-notify');
var babelify    = require('babelify');
var runSequence = require('run-sequence');
var del         = require('del');
var watchify    = require('watchify');

function makeBrowserifyBundler(entrypoint, destDir, destFile, watch, coverage) {
  var bundler = browserify({entries: entrypoint, cache: {}, packageCache: {}})
    .transform(babelify, {presets: ['es2015', 'react']})
    .transform(ngAnnotate)
    .transform(brfs)
    .transform(envify);

  if (coverage) {
    bundler.transform(istanbul);
  }
  if (watch) {
    bundler = watchify(bundler);
  }

  var bundle = function() {
    return bundler
            .bundle()
            .on('error', function(err) {
              gutil.log(err.toString());
              this.emit('end');
            })
            .pipe(source(destFile))
            .pipe(destAtomic(destDir))
            .pipe(connect.reload());
  };

  bundler.on('update', bundle);
  bundler.on('log', gutil.log);
  return bundle();
}

function js(watch, coverage, fileName) {
  if(!fileName){
    fileName = 'app.js';
  }
  return makeBrowserifyBundler(
    './app/scripts/app.js',
    './.tmp/scripts',
    fileName,
    watch,
    coverage
  );
}

function testJs(watch) {
  return makeBrowserifyBundler(
    glob.sync('./test/**/*.js'),
    './.tmp/test',
    'tests.js',
    watch,
    false
  );
}

/*************************** test-coverage ***************************/

gulp.task('coverage-js', ['lint-js'], function() {
  var watch = false, coverage = true;
  return js(watch, coverage, 'app_coverage.js');
});

gulp.task('test-coverage', ['coverage-js', 'prod-test-js'], function(done) {
  var server = new KarmaServer({
    configFile: __dirname + '/karma_coverage.conf.js',
    singleRun: true,
    reporters: ['dots', 'coverage']
  }, done);
  server.start();
});

/****************************** test **********************************/

gulp.task('prod-test-js', function() {
  var watch = false;
  return testJs(watch);
});

gulp.task('prod-js', ['lint-js'], function() {
  var watch = false,
      coverage = false;
  return js(watch, coverage);
});

gulp.task('test', ['prod-js', 'prod-test-js'], function(done) {
  var server = new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
  server.start();
});

/****************************** test-watch **********************************/

gulp.task('dev-test-js', function() {
  var watch = true;
  return testJs(watch);
});

gulp.task('dev-js', ['lint-js'], function() {
  var watch = true,
      coverage = false;
  return js(watch, coverage);
});

gulp.task('test-watch', ['dev-js', 'dev-test-js'], function() {
  var server = new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  });
  server.start();
});

/************************ fonts/svg/css/lint ******************************/

gulp.task('fonts', function() {
  return gulp.src('./app/styles/fonts/*')
    .pipe(gulp.dest('./.tmp/styles'));
});

gulp.task('svg', function() {
  return gulp.src('./app/images/*.svg')
    .pipe(svgmin())
    .pipe(destAtomic('./.tmp/images'));
});

gulp.task('css', ['svg'], function () {
  return gulp.src('./app/styles/*.css')
    .pipe(prefix('last 1 version'))
    .pipe(base64({baseDir: './.tmp/images'}))
    .pipe(destAtomic('./.tmp/styles'))
    .pipe(connect.reload());
});

gulp.task('lint-js', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});
/****************************** usemin **********************************/

gulp.task('usemin', ['css', 'prod-js', 'fonts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      libCss: [minifyCss(), rev()],
      appCss: [minifyCss(), rev()],
      libJs: [uglify(), rev()],
      appJs: [uglify(), rev()],
      ngLibJs: [uglify(), rev()]
    }))
    .pipe(destAtomic('./dist'));
});

gulp.task('copy-static-files', function() {
  return gulp.src(['./app/404.html', './app/favicon.ico', './app/robots.txt'])
    .pipe(destAtomic('./dist'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(['./app/styles/fonts/*.{eot,ttf,woff}'])
    .pipe(destAtomic('./dist/styles'));
});

gulp.task('gzip', ['usemin', 'copy-static-files', 'copy-fonts'], function() {
  return gulp.src('./dist/**/*')
    .pipe(gzip())
    .pipe(destAtomic('./dist'));
});

gulp.task('clean', function() {
  return del([
    'dist',
    '.tmp',
    'coverage'
  ]);
});

gulp.task('watch', function() {
  gulp.watch('./app/scripts/**/*.{js,html,json}',   ['lint-js']);
  gulp.watch('./app/views/**/*.html',               ['lint-js']);
  gulp.watch('./app/styles/**/*.css',               ['css']);
  gulp.watch('./app/images/*.svg',                  ['css']);
});

gulp.task('connect', function() {
  connect.server({
    root: ['.tmp', 'app'],
    port: 9999,
    livereload: true
  });
});

/****************************** server / build  **********************************/

gulp.task('server', ['css', 'fonts', 'connect', 'watch', 'test-watch']);

gulp.task('build', ['test'], function(cb){
  runSequence('clean', 'gzip', cb);
});
