'use strict';

module.exports = function (grunt) {
    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        clean: {
            jasmine: ['build/jasmine'],
            reports: ['build/reports'],
            coverage: ['build/coverage']
        },
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                regexp: true,
                undef: true,
                unused: true,
                indent: 4,
                quotmark: 'single',
                node: true,
                globals: {
                }
            },
            test: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
            jslint: {
                options: {
                    reporter: 'jslint',
                    reporterOutput: 'build/reports/jshint.xml'
                },
                files: {
                    src: ['Gruntfile.js', 'lib/**/.js', 'test/**/*.js']
                }
            },
            checkstyle: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'build/reports/jshint_checkstyle.xml'
                },
                files: {
                    src: ['Gruntfile.js', 'lib/**/.js', 'test/**/*.js']
                }
            }
        },
        bgShell: {
            coverage: {
                cmd: 'node node_modules/istanbul/lib/cli.js cover --dir build/coverage node_modules/grunt-jasmine-node/node_modules/jasmine-node/bin/jasmine-node -- test --forceexit'
            },
            cobertura: {
                cmd: 'node node_modules/istanbul/lib/cli.js report --root build/coverage --dir build/coverage/cobertura cobertura'
            }
        },
        open: {
            file: {
                path: 'build/coverage/lcov-report/index.html'
            }
        },
        jasmine_node: {
            specNameMatcher: './*.spec', // load only specs containing specNameMatcher
            projectRoot: 'test',
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: true,
                savePath: 'build/jasmine/',
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    // Register tasks.
    grunt.registerTask('test', ['clean:jasmine', 'jshint:test', 'jasmine_node']);
    grunt.registerTask('cover', ['clean:coverage', 'jshint:test', 'bgShell:coverage', 'open']);
    grunt.registerTask('ci', ['clean', 'jshint:jslint', 'jshint:checkstyle', 'bgShell:coverage', 'bgShell:cobertura', 'jasmine_node']);

    // Default task.
    grunt.registerTask('default', ['test']);
};