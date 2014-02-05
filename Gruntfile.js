module.exports = function(grunt) {
	// load tasks
	[	'grunt-contrib-copy',
		'grunt-contrib-uglify',
		'grunt-contrib-cssmin',
		'grunt-sass',
		'grunt-contrib-coffee',
	].forEach(function(task) {
		grunt.loadNpmTasks(task);
	});
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compile: {
				files: {
					'build/js/<%= pkg.name %>.js': ['src/coffee/*.coffee'] // compile and concat into single file
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'build/js/<%= pkg.name %>.min.js': ['build/js/<%= pkg.name %>.js']
				}
			}
		},
		sass: {
			dist: {
				files: {
					'build/style/main.css': 'src/style/main.scss'
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'build/style/',
				src: ['*.css', '!*.min.css'],
				dest: 'build/style/',
				ext: '.min.css'
			}
		},
		copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'build/',
                    src: [
                        '*',
                    ],
                    filter: 'isFile'
                }]
            }
        },
	});

	grunt.registerTask('buildjs', ['coffee', 'uglify']);
	grunt.registerTask('buildcss', ['sass', 'cssmin']);

	grunt.registerTask('default', ['buildjs', 'buildcss', 'copy']);

};