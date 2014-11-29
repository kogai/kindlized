module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'public/',
                    hostname:'localhost'
                }
            },
            stop : {
                options : { keepalive: false }
            }
        },
        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        jshint: {
            files: ['public/javascripts/*.js'],
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
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/javascripts/*.js'],
                dest: 'public/javascripts/min/functions.min.js'
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
        compass : {
            check : {
                options : {
                    outputStyle: 'nested',
                    sassDir : 'public/stylesheets/sass' , 
                    cssDir : 'public/stylesheets/sass/lint'
                }
            },
            dist : {
                options : {
                    sourcemap: true,
                    outputStyle: 'compressed',
                    sassDir : 'public/stylesheets/sass' , 
                    cssDir : 'public/stylesheets/'
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
                files: [ 'public/javascripts/*.js' , 'public/javascripts/lib/*.js' ],
                tasks: [ 'jshint' , 'command:build' /*'concat', 'uglify'*/ ],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            sass : {
                files : [ 'public/stylesheets/sass/*.sass' ],
                tasks: [ 'compass:check' , 'csslint' , 'compass:dist' ] ,
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            express: {
                files:  [ 'app.js' , 'routes/*.js' ],
                tasks:  [ 'command:dev' ],
                options: {
                    delay: 1000
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
    })

    grunt.registerTask('build', [ 'haml' , 'jshint' , 'concat', 'uglify' , 'compass:check' , 'csslint' , 'compass:dist' ]);
    grunt.registerTask('default', [ 'jshint' , 'command:build' , 'compass:check' , 'csslint' , 'compass:dist' , 'command:dev' , 'watch' ]);
};