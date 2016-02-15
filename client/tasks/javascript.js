const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

const config = require('tasks/config');
const srcPath = config.srcPath;
const destPath = config.destPath;
const IS_DEVELOPMENT = config.IS_DEVELOPMENT;

function handleErrors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>',
  }).apply(this, args);
  this.emit('end');
}

module.exports = function javascript() {
  const bundles = [
    'home',
    'series',
    'account',
    'with-server',
  ];

  const bundles$ = bundles.map((bundle)=> (
    browserify({
      entries: `${srcPath.entries}/${bundle}.js`,
      extensions: ['.js'],
      debug: IS_DEVELOPMENT,
    })
    .transform('babelify')
    .transform('envify')
    .bundle()
    .on('error', handleErrors)
    .pipe(plumber())
    .pipe(source(`${bundle}.bundle.min.js`))
    .pipe(buffer())
    .pipe(IS_DEVELOPMENT ? gutil.noop() : uglify())
    .pipe(gulp.dest(destPath.app))
  ));

  return merge(bundles$).pipe(connect.reload());
};
