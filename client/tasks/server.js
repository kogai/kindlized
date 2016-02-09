const gulpConnect = require('gulp-connect');
const destPath = require('tasks/config').destPath;

module.exports = function server() {
  gulpConnect.server({
    root: destPath.root,
    port: 3000,
    livereload: true,
  });
};
