gulp		= require 'gulp'
browserSync = require 'browser-sync'
reload	  = browserSync.reload
data		= require 'gulp-data'
debug	   = require 'gulp-debug'
newer	   = require 'gulp-newer'
# sass		= require 'gulp-sass'
sourcemaps  = require 'gulp-sourcemaps'
minify	  = require 'gulp-minify-css'

# lint
jshint	  = require 'gulp-jshint'
stylish	 = require 'jshint-stylish'

# browserify
browserify  = require 'browserify'
debowerify  = require 'debowerify'
licensify   = require 'licensify'
source	  = require 'vinyl-source-stream'
streamify   = require 'gulp-streamify'
uglify	  = require 'gulp-uglify'
coffeelint  = require 'gulp-coffeelint'

# jade
jade		= require 'gulp-jade'

# images
pngmin	  = require 'gulp-pngmin'
imagemin	= require 'gulp-imagemin'
jpegtran	= require 'imagemin-jpegtran'

# watch
watch	   = require 'gulp-watch'

# gulp.task 'sass', ->
#	 gulp.src('src/sass/*.sass')
#	 .pipe( sourcemaps.init() )
#	 .pipe( sass() )
#	 .pipe( minify() )
#	 .pipe( sourcemaps.write('./') )
#	 .pipe( gulp.dest('./build/employment/graduate2016/css') )
#
# gulp.task 'pngmin', ->
#	 gulp.src [ 'src/images/*.png', 'src/images/**/*.png' ]
#	 .pipe newer( './build/employment/graduate2016/images' )
#	 .pipe pngmin()
#	 .pipe gulp.dest( './build/employment/graduate2016/images' )
#
# gulp.task 'jpgmin', ->
#	 gulp.src([ 'src/images/*.jpg', 'src/images/**/*.jpg', 'src/images/*.jpeg', 'src/images/**/*.jpeg' ])
#	 .pipe imagemin(
#		 prpgressive: true
#		 svgoPlugins: [ { removeViewBox: false } ]
#		 use: [ jpegtran() ]
#	 )
#	 .pipe gulp.dest( './build/employment/graduate2016/images' )


gulp.task 'lint', ->
	gulp.src([
		'./shelf/*.js'
		'./shelf/**/*.js'
	])
	.pipe jshint()
	.pipe jshint.reporter stylish
	return

gulp.task 'browserify', ->
	browserify
		entries: ['./src/javascripts/index.coffee']
		extensions: ['.coffee', '.js']
	.plugin licensify
	.transform 'coffeeify'
	.transform 'debowerify'
	.bundle()
	.pipe source('bundle.min.js')
	# .pipe streamify uglify()
	.pipe gulp.dest './public/javascripts/'


gulp.task 'watches', ->
	# gulp.watch [
	# 	 './**/*.js'
	# 	 './**/**/*.js'
	# 	 './**/**/**/*.js'
	# ],[
	# 	 'lint'
	# ]
	gulp.watch [
		'./src/javascripts/*.coffee'
		'./src/javascripts/**/*.coffee'
		'./src/javascripts/**/**/*.coffee'
	],[
		'browserify'
	]
	return

gulp.task 'default', [
	'lint'
	'browserify'
	'watches'
]
