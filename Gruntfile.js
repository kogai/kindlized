module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		jshint: {
			files: ['public/javascripts/lib/*.js','models/*.js', 'models/**/*.js', 'routes/*.js' , '*.js' ],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				},
				ignores : ['public/javascripts/_analytics.js'],
				force : true
			}
		},
		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'public/javascripts/min/functions.min.map'
				},
				files: {
					'public/javascripts/min/functions.min.js': ['public/javascripts/*.js']
				}
			}
		},
		csslint : {
			strict : {
				options : {
					'adjoining-classes' : false,
					'star-property-hack' : false,
					'ids' : false,
					'important' : false,
					'box-sizing' : false,
					'text-indent' : false,
					'fallback-colors' : false,
					'regex-selectors' : false
				},
				src : ['public/sass/lint/*.css']
			}
		},
		command: {
			dev : {
				cmd: 'node bin/www'
			},
			build : {
				cmd: 'npm run build'
			}
		},
		watch: {
			js : {
				files: [ 'public/javascripts/*.js' , 'public/javascripts/lib/*.js', '*.js', 'models/*.js', 'models/**/*.js', 'routes/*.js' ],
				tasks: [ 'jshint' , 'command:build' ],
				options: {
					livereload: true,
					nospawn: true
				}
			}
		}
	});

	[
		'grunt-contrib-commands',
		'grunt-contrib-connect',
		'grunt-express-server',
		'grunt-contrib-uglify',
		'grunt-contrib-concat',
		'grunt-contrib-watch',
		'grunt-contrib-compass',
		'grunt-contrib-jshint',
		'grunt-contrib-csslint'
	].forEach(function (task) {
		grunt.loadNpmTasks(task);
	});

	grunt.registerTask('server', [ 'jshint']);
	grunt.registerTask('default', [ 'jshint' , 'command:build' , 'watch' ]);
};