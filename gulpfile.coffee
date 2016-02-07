gulp = require 'gulp'
stylus = require 'gulp-stylus'
nib = require 'nib'
sourcemaps = require 'gulp-sourcemaps'
server = require 'gulp-develop-server'

# browserify
browserify = require 'browserify'
licensify = require 'licensify'
source = require 'vinyl-source-stream'
streamify = require 'gulp-streamify'
uglify = require 'gulp-uglify'
coffeelint = require 'gulp-coffeelint'

# watch
watch = require 'gulp-watch'

src =
  server: [
    'models/*'
    'models/**/*'
    'models/**/**/*'
    'routes/*'
    'routes/**/*'
    'routes/**/**/*'
  ]

gulp.task 'server', ->
  server.listen
    path: 'bin/www'

gulp.task 'stylus', ->
  gulp.src './client/stylus/index.styl'
  .pipe(sourcemaps.init())
  .pipe(stylus({
    use: nib()
    compress: true
  }))
  .pipe( sourcemaps.write('.') )
  .pipe( gulp.dest('./public/stylesheets') )

gulp.task 'browserify', ->
  browserify
    entries: ['./client/app.js']
    extensions: ['.js']
  .transform 'babelify'
  .bundle()
  .pipe source('bundle.min.js')
  .pipe gulp.dest './public/javascripts/'

gulp.task 'copy', ->
  gulp.src([
    './client/javascripts/views/*.html'
  ])
  .pipe gulp.dest './public/views/'

gulp.task 'watch', ->
  gulp.watch(src.server, server.restart)
  gulp.watch [
    './client/stylus/*.styl'
    './client/stylus/**/*.styl'
    './client/stylus/**/**/*.styl'
  ],[
    'stylus'
  ]
  gulp.watch [
    './client/javascripts/*.coffee'
    './client/javascripts/**/*.coffee'
    './client/javascripts/**/**/*.coffee'
  ],[
    'browserify'
  ]
  gulp.watch [
    './client/javascripts/views/*.html'
  ],['copy']
  return

gulp.task 'compile', [
  'browserify'
  'stylus'
  'copy'
]

gulp.task 'default', [
  'compile'
  'server'
  'watch'
]
