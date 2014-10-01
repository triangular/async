module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                "camelcase": true,
                "curly": true,
                "expr": true,
                "eqeqeq": false,
                "freeze": true,
                "globalstrict": true,
                "globals": {
                    "angular": false
                },
                "immed": true,
                "indent": 4,
                "latedef": true,
                "maxdepth": 2,
                "maxstatements": 12,
                "maxcomplexity": 5,
                "noarg": true,
                "noempty": true,
                "nonew": true,
                "quotmark": true,
                "strict": true,
                "trailing": true,
                "undef": true,
                "unused": true,
                "white": true
            },
            default: ['src/tri-angular-async.js']
        },

        uglify: {
            options: {
                report: 'gzip',
                sourceMap: true
            },
            my_target: {
                files: {
                    'dist/tri-angular-async.min.js': ['src/tri-angular-async.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {src: ['src/tri-angular-async.js'], dest: 'demo/lib/tri-angular-async/tri-angular-async.js'},
                    {src: ['src/tri-angular-async.js'], dest: 'dist/tri-angular-async.js'}
                ]
            }
        }

    });

    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'copy'
    ]);

};
