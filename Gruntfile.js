module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        strict: false,
        mocha: true
      },
      all: {
        src: ['src/*.js', 'bin/*.js']
      }
    },
    clean: {
      coverage: {
        src: ['cov/']
      },
      reports: {
        src: ['reports/']
      }
    },
    copy: {
      test: {
        src: ['test/**'],
        dest: 'cov/'
      }
    },
    blanket: {
      src: {
        src: ['src/'],
        dest: 'cov/src/'
      }
    },
    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec'
        },
        src: ['cov/test/*.test.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'reports/lcov.info'
        },
        src: ['cov/test/*.test.js']
      }
    },
    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'reports/lcov.info'
      }
    }
  });

  // Default task.
  grunt.registerTask('build', ['clean', 'blanket', 'copy']);
  grunt.registerTask('default', ['jshint', 'build', 'mochaTest']);
  grunt.registerTask('ci', ['default', 'coveralls']);
};
