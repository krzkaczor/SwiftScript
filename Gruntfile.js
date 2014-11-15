module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.initConfig({
    watch: {
      scripts: {
        files: ['output/es6/*.js'],
        tasks: ['traceur'],
        options: {
          spawn: false
        }
      }
    },
    traceur: {
      options: {
        includeRuntime: true,
        blockBinding: true
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'output/es6',
          src: ['*.js'],
          dest: 'output/es5'
        }]
      }
    }
  })
}