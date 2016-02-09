const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const connect = require('gulp-connect');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const merge = require('merge-stream');

const config = require('tasks/config');
const srcPath = config.srcPath;
const destPath = config.destPath;

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
  ];

  const bundles$ = bundles.map((bundle)=> {
    const b = browserify({
      entries: `${srcPath.entries}/${bundle}.js`,
      extensions: ['.js'],
      debug: process.env.NODE_ENV !== 'production',
    })
    .transform('babelify')
    .transform('envify')
    .bundle()
    .on('error', handleErrors)
    .pipe(plumber())
    .pipe(source(`${bundle}.bundle.min.js`))
    .pipe(gulp.dest(destPath.app));

    return b;
  });

  return merge(bundles$).pipe(connect.reload());
};
