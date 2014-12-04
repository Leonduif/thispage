module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    keepalive: true,
                    hostname: 'localhost'
                }
            }
        },
        compass: {
            dist: {
               options: {
                   sassDir: 'assets/sass',
                   cssDir: 'dist',
                   outputStyle: 'expanded'
               }
           }
        },
        watch: {
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['index.html', 'views/*.html'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true
                }
            }
        },
        concat: {
            files: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'assets/js/*.js'
                ],
                dest: 'dist/main.js'
            }
        },
        uglify: {
            files: {
                src: ['dist/main.js'],
                dest: 'dist/main.min.js'
            }
        }
    });

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Tasks
    grunt.registerTask('default', ['compass']);
    grunt.registerTask('dev', ['connect', 'watch']);
};