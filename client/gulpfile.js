const gulp = require('gulp');
const runSequence = require('run-sequence');

const copy = require('tasks/copy');
const javascript = require('tasks/javascript');
const server = require('tasks/server');

const srcPath = require('tasks/config').srcPath;

gulp.task('copy', copy);
gulp.task('javascript', javascript);
gulp.task('server', server);

gulp.task('build', ['copy', 'javascript']);

gulp.task('watch', ()=> {
  const watches = [
    'copy',
    'javascript',
  ];
  watches.forEach((watchStr)=> gulp.watch(srcPath[watchStr], [watchStr]));
});

gulp.task('default', ()=> runSequence('build', ['server', 'watch']));
gulp.task('dev', ()=> runSequence('build', ['watch']));
