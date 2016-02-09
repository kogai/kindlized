const gulp = require('gulp');
const connect = require('gulp-connect');
const merge = require('merge-stream');

const config = require('tasks/config');
const srcPath = config.srcPath;
const destPath = config.destPath;

const fontPath = 'node_modules/font-awesome/fonts/*';
const cssPath = [
  'node_modules/font-awesome/css/*.min.css',
  'app/style.css',
];

module.exports = function copy() {
  const font$ = gulp.src(fontPath).pipe(gulp.dest(destPath.font));
  const css$ = gulp.src(cssPath).pipe(gulp.dest(destPath.stylesheet));
  // const html$ = gulp.src(`${srcPath.dir.app}/*.html`).pipe(gulp.dest(destPath.root));

  return merge(font$, css$).pipe(connect.reload());
};
