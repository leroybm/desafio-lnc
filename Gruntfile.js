module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            css: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'js/script.min.js': 'js/script.js'
                }
            }
        },
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['js/script.js'],
                tasks: ['uglify']
            }
        }
    });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['watch']);

};