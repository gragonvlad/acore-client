/*global module:false*/
module.exports = function(grunt) {

  // WrathNet configuration
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      
      // Banner prepended to distribution
      banner: '/**\n' +
              ' * WrathNet Foundation v<%= pkg.version %> \n' +
              ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.homepage %>>\n' +
              ' *\n' +
              ' * World of Warcraft client foundation written in JavaScript, enabling\n' + 
              ' * development of expansion-agnostic clients, bots and other useful tools.\n' +
              ' *\n' +
              ' * The contents of this file are subject to the MIT License, under which \n' +
              ' * this library is licensed. See the LICENSE file for the full license.\n' +
              ' */'
    },
    
    // Compiles CoffeeScript source and specs
    coffee: {
      src: {
        dir: 'src',
        dest: 'build'
      },
      spec: {
        dir: 'spec',
        dest: 'build-spec'
      }
    },
    
    // Lints compiled JavaScript files
    lint: {
      files: [
        'grunt.js',
        'build/**/*.js',
        'build-spec/**/*.js',
        'vendor/**/*.js'
      ]
    },
    
    // Concatenate compiled JavaScript files
    // Note: Order is significant due to namespacing
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'build/wrathnet.js',
          'vendor/object-extension.js',
          'vendor/property-shorthands.js',
          'build/wrathnet/crypto/**/*.js',
          'vendor/bufferview.js',
          'build/wrathnet/datastructures/**/*.js',
          'build/wrathnet/net/**/*.js',
          'build/wrathnet/expansions/expansion.js',
          'build/wrathnet/expansions/wotlk/wotlk-expansion.js',
          'build/wrathnet/expansions/wotlk/net/**/*.js',
          'build/wrathnet/expansions/wotlk/**/*.js',
          'build/wrathnet/sessions/**/*.js',
          'vendor/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    
    // Minified distribution
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    
    // Watch for changes to CoffeeScript files
    watch: {
      files: [
        'src/**/*.coffee',
        'spec/**/*.coffee',
        'vendor/**/*.js'
      ],
      tasks: 'coffee lint concat'
    },
    
    // JSHint options
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: false,
        latedef: false,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        shadow: true
      },
      globals: {
        WrathNet: true,
        WebSocket: true,
        BufferView: true,
        ArrayBuffer: true,
        Uint8Array: true,
        signals: true,
        console: true
      }
    },
    uglify: {}
  });
  
  grunt.loadTasks('tasks');
  
  grunt.registerTask('default', 'watch');
  grunt.registerTask('release', 'coffee lint concat min');

};
