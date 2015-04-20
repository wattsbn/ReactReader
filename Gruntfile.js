'use strict';
var application = require('./utilities/webpack/application');

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    keepalive: true
                }
            }
        },
        jshint: {
            options: {
                additionalSuffixes: ['.js'],
                esnext: true,
                jshintrc: '.jshintrc'
            },
            files: [
                '*.js',
                '**/*.js',
                '!build/**/*',
                '!**/node_modules/**/*'
            ]
        },
        clean: {
            build: ['./build']
        }
    });

    // *** Load plugins *** //
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // *** Load webpack tasks *** //
    function toBool(value) { return !(!value || value === 'false'); }
    grunt.registerTask('webpack-build', 'Build the application using webpack', function(minify, hideSourceMaps) {
        application.build(toBool(minify), toBool(hideSourceMaps), this.async());
    });

    grunt.registerTask('fast-build', 'Build the application without minification', ['webpack-build']);
    grunt.registerTask('slow-build', 'Build the application with minification', ['webpack-build:true']);
    grunt.registerTask('build', 'Clean and build the application', ['clean:build', 'webpack-build:true']);

    grunt.registerTask('webpack-connect', 'Start webpack dev server', function(fast, auto, minify) {
        application.connect(toBool(fast), toBool(auto), toBool(minify), this.async());
    });

    grunt.registerTask('start', 'Start webpack dev server on fast mode', ['webpack-connect:true:true:false']);
    grunt.registerTask('start-manual', 'Start webpack dev server on fast mode without auto refresh turned on', ['webpack-connect:true:false:false']);

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['lint', 'build']);
};
