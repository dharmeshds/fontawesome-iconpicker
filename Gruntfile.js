'use strict';

const FONTAWESOME_VERSION = '5.5.0';
const jsBanner = `/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */
 `;

module.exports = function(grunt) {
    const parsedIconPicker = 'prod/src/js/iconpicker.js';
    const tempIconsFile = 'src/icons.yml';
    const destFile = 'src/icons.json';
    grunt.initConfig({
        yaml: {
            getIcons: {
                options: {
                    space: 2,
                    disableDest: true,
                    middleware: function(response, sourceJSON, src, dest) {
                        let targetJSON = {
                            icons: []
                        };
                        sourceJSON = JSON.parse(sourceJSON);
                        Object.keys(sourceJSON).forEach(function(key) {
                            let ele = sourceJSON[key];
                            let icon = 'fa-' + key;
                            ele.styles.forEach(function(style) {
                                style = style.toLowerCase();
                                if (style.startsWith('light')) {
                                    let targetObj = {
                                        title: 'fal ' + icon,
                                        searchTerms: []
                                    };
                                    ele.search.terms.forEach(function(term) {
                                        targetObj.searchTerms.push(term);
                                    });
                                    targetJSON.icons.push(targetObj);
                                }
                            });
                        });
                        grunt.file.write(destFile, JSON.stringify(targetJSON));
                    }
                },
                files: [{
                    expand: false,
                    src: [tempIconsFile],
                    dest: destFile
                }]
            },
        },
        'string-replace': {
            dist: {
                files: {
                    'prod/': ['src/js/iconpicker.js'],
                },
                options: {
                    replacements: [{
                        pattern: '//###REPLACE-WITH-FONT-AWESOME-5-FONTS###',
                        replacement: "<%= grunt.file.read('" + destFile + "') %>"
                    }]
                }
            }
        },
        less: {
            dist: {
                options: {
                    compile: true,
                    compress: false
                },
                files: {
                    'dist/css/fontawesome-iconpicker.css': [
                        'src/less/iconpicker.less'
                    ]
                }
            },
            distMin: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'dist/css/fontawesome-iconpicker.min.css': [
                        'src/less/iconpicker.less'
                    ]
                }
            }
        },
        jsbeautifier: {
            files: ['Gruntfile.js', 'src/js/*.js', parsedIconPicker]
        },
        uglify: {
            distMin: {
                options: {
                    compress: {},
                    beautify: false,
                    comments: 'some',
                    banner: jsBanner
                },
                files: {
                    'dist/js/fontawesome-iconpicker.min.js': [
                        'src/js/jquery.ui.pos.js',
                        parsedIconPicker
                    ]
                }
            },
            dist: {
                options: {
                    compress: false,
                    beautify: true,
                    comments: 'some',
                    banner: jsBanner
                },
                files: {
                    'dist/js/fontawesome-iconpicker.js': [
                        'src/js/jquery.ui.pos.js',
                        parsedIconPicker
                    ]
                }
            }
        },
        watch: {
            less: {
                files: [
                    'src/less/*.less'
                ],
                tasks: ['less']
            },
            js: {
                files: [
                    'src/js/*.js'
                ],
                tasks: ['uglify']
            }
        },
        clean: {
            dist: [
                'dist/css',
                'dist/js/*.js'
            ],
            temp: [
                destFile,
                'prod/'
            ]
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-yaml');
    grunt.loadNpmTasks('grunt-http-download');
    grunt.loadNpmTasks('grunt-string-replace');

    // Register tasks
    grunt.registerTask('default', [
        'yaml',
        'string-replace',
        'clean:dist',
        'less',
        'jsbeautifier',
        'uglify',
        'clean:temp'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
