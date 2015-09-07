'use strict';

function loadConnect(grunt, config) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    config.connect = {
        server: {
            options: {
                port: 9000,
                hostname: '*',
                keepalive: true
            }
        }
    };
}

function loadClean(grunt, config) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    config.clean = {
        build: ['./build'],
        data: ['./data']
    }
}

function loadHelpers(grunt) {
    grunt.registerTask('data', 'Generates files for use during development', function() {
        require('./utilities/helpers/generateData').createComics();
    });
}

function toBool(value) { return !(!value || value === 'false'); }
function loadWebpack(grunt) {
    var application = require('./utilities/webpack/application');

    grunt.registerTask('webpack-connect', 'Start webpack dev server', function(fast, auto, minify) {
        application.connect(toBool(fast), toBool(auto), toBool(minify), this.async());
    });

    grunt.registerTask('webpack-build', 'Build the application using webpack', function(minify, hideSourceMaps) {
        application.build(toBool(minify), toBool(hideSourceMaps), this.async());
    });
}

module.exports = function(grunt) {
    var config = {};

    grunt.loadNpmTasks('grunt-eslint');
    config.eslint = {
        target: [
            './scripts/**/*.js'
        ]
    };

    loadConnect(grunt, config);
    loadClean(grunt, config);

    loadHelpers(grunt);
    loadWebpack(grunt);

    grunt.registerTask('fast-build', 'Build the application without minification', ['webpack-build']);
    grunt.registerTask('slow-build', 'Build the application with minification', ['webpack-build:true']);
    grunt.registerTask('build', 'Clean and build the application', ['clean:build', 'webpack-build:true']);

    grunt.registerTask('start', 'Start webpack dev server on fast mode', ['webpack-connect:true:true:false']);
    grunt.registerTask('start-manual', 'Start webpack dev server on fast mode without auto refresh turned on', ['webpack-connect:true:false:false']);

    grunt.registerTask('start-server', 'Start the api server', function() {
        require('./server/main').start(this.async());
    });

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('default', ['lint', 'build']);

    grunt.initConfig(config);
};
