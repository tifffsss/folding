module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*
    * https://github.com/gruntjs/grunt-contrib-sass
    * description: compile sass to css
    */
    sass: {
      dist: {
        files : [
          {
            cwd : 'scss',
            src : ['style.scss'],
            dest : 'dist/css/',
            ext : '.sass.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded'
        }
      }
    },
    /*
    * url: https://github.com/ai/autoprefixer
    * description: Autoprefixer uses the data on current browser popularity and properties support to apply prefixes for you:
      a { transition: transform 1s }
      become
      a {
        -webkit-transition: -webkit-transform 1s;
        transition: -ms-transform 1s;
        transition: transform 1s
      }
    */
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['dist/css/*.sass.css'],
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      css: {
        options: {
          separator: '',
        },
        src: ['dist/css/style.autoprefixed.css' ],
        dest: 'dist/css/style.css'
      }
    },
    /*
    * url: https://github.com/gruntjs/grunt-contrib-cssmin
    * description: minify the css
    */
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css', '!*.sass.css', '!*.autoprefixed.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    /*
    * url : https://github.com/gruntjs/grunt-contrib-clean
    * description: clean / remove files - folders, etc...
    */
    clean: {
      sass: {
        src: ["dist/css/style.sass.css", "dist/css/style.autoprefixed.css"]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('scss', ['sass', 'autoprefixer', 'concat:css', 'cssmin:minify', 'clean:sass']);

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'scss', 'concat:js', 'uglify']);

};