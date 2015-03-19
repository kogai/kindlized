gulp				= require 'gulp'
browserSync = require 'browser-sync'
reload	  	= browserSync.reload
data				= require 'gulp-data'
debug	   		= require 'gulp-debug'
newer	   		= require 'gulp-newer'
stylus			= require 'gulp-stylus'
nib 				= require 'nib'
sourcemaps  = require 'gulp-sourcemaps'
minify	  	= require 'gulp-minify-css'

# lint
jshint	  = require 'gulp-jshint'
stylish	 	= require 'jshint-stylish'

# browserify
browserify  = require 'browserify'
debowerify  = require 'debowerify'
licensify   = require 'licensify'
source	  	= require 'vinyl-source-stream'
streamify   = require 'gulp-streamify'
uglify	  	= require 'gulp-uglify'
coffeelint  = require 'gulp-coffeelint'

# watch
watch	   = require 'gulp-watch'

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
	# .pipe streamify uglify()
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
