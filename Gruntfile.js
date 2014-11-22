module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');


  grunt.registerTask('default', '', function() {
    var taskList = [
      'watch',
      'nodemon'
    ];
    grunt.task.run(taskList);
  });
  //
  grunt.registerTask('swift_script', function () {
    grunt.util.spawn(
        { cmd: 'node'
          , args: ['runner.js']
        })
  })

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'runner.js',
        options: {
          watch: ['playground']
        }
      }
    },
    watch: {
      es6: {
        files: ['output/es6/output.js'],
        tasks: ['traceur'],
        options: {
          spawn: false,
          debounceDelay: 100000
        }
      },
      playground: {
        files: ['Input.playground/section-1.swift'],
        tasks: ['swift_script'],
        options: {
          spawn: false
        }
      }
    },
    traceur: {
      options: {
        includeRuntime: true,
        blockBinding: true,
        moduleNames: true
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'output/es6/',
          src: ['output.js'],
          dest: 'output/es5'
        }]
      }
    }
  });
};


