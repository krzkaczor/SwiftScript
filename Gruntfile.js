module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-execute');


  grunt.registerTask('default', '', function() {
    var taskList = [
      'watch'
    ];
    grunt.task.run(taskList);
  });

  grunt.initConfig({
    execute: {
      target: {
        src: ['runner.js']
      }
    },
    watch: {
      es6: {
        files: ['output/es6/output.js'],
        tasks: ['traceur'],
        options: {
          spawn: false,
          livereload: 3050
        }
      },
      playground: {
        files: ['Input.playground/section-1.swift'],
        tasks: ['execute'],
        options: {
          spawn: true,
          livereload: 3050
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


