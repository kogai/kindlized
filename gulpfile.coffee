gulp        = require 'gulp'
stylus      = require 'gulp-stylus'
nib         = require 'nib'
sourcemaps  = require 'gulp-sourcemaps'

# browserify
browserify  = require 'browserify'
debowerify  = require 'debowerify'
licensify   = require 'licensify'
source      = require 'vinyl-source-stream'
streamify   = require 'gulp-streamify'
uglify      = require 'gulp-uglify'
coffeelint  = require 'gulp-coffeelint'

# watch
watch     = require 'gulp-watch'

gulp.task 'stylus', ->
  gulp.src './src/stylus/index.styl'
  .pipe( sourcemaps.init() )
  .pipe( stylus({
    use: nib()
    compress: true
  }))
  .pipe( sourcemaps.write('.') )
  .pipe( gulp.dest('./public/stylesheets') )

gulp.task 'browserify', ->
  browserify
    entries: ['./src/javascripts/index.coffee']
    extensions: ['.coffee', '.js']
  .plugin licensify
  .transform 'coffeeify'
  .transform 'debowerify'
  .bundle()
  .pipe source('bundle.min.js')
  .pipe gulp.dest './public/javascripts/'


gulp.task 'watch', ->
  gulp.watch [
   './src/stylus/*.styl'
   './src/stylus/**/*.styl'
   './src/stylus/**/**/*.styl'
  ],[
   'stylus'
  ]
  gulp.watch [
    './src/javascripts/*.coffee'
    './src/javascripts/**/*.coffee'
    './src/javascripts/**/**/*.coffee'
  ],[
    'browserify'
  ]
  return

gulp.task 'default', [
  'browserify'
  'stylus'
  'watch'
]
