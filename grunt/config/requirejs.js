module.exports = function() {
  'use strict';
  var _ = require('underscore');
  var path = require('path');
  var rjsConfPath = path.resolve('./client/scripts/require-conf');
  var rjsConf = require(rjsConfPath);

  // NOTE: we use "./../" in this file, because the "working directory"
  // a.k.a. "basePath" property is actually "./client"
  var deps = [
    'camunda-casemanager-ui/require-conf',
    './../node_modules/requirejs/require',
    // 'require-conf',
    // 'require',

    'camunda-commons-ui/auth',
    'jquery',
    'jquery-ui/ui/core',
    'jquery-ui/ui/widget',
    'jquery-ui/ui/mouse',
    'jquery-ui/ui/sortable',
    'angular',
    'moment',

    'camunda-bpm-sdk',

    'angular-bootstrap',
    'bootstrap/collapse',
    'angular-route',
    'angular-animate',
    'angular-moment',
    'angular-ui-sortable'
  ];


  _.extend(rjsConf.paths, {
    'camunda-bpm-sdk-js':   './../node_modules/camunda-bpm-sdk-js/dist',
    'camunda-commons-ui':   './../node_modules/camunda-commons-ui/lib',

    'require':              './../node_modules/requirejs/require',
    'require-conf':         './../client/scripts/require-conf',

    // the localescompile task puts the generated files in the build directory
    // and we want them to be included in the build
    'locales':              './../<%= buildTarget %>/locales'
  });


  var rConf = {
    options: {
      stubModules: [
        'json',
        'text'
      ],

      optimize: '<%= (buildTarget === "dist" ? "uglify2" : "none") %>',
      preserveLicenseComments: false,
      generateSourceMaps: true,

      baseUrl: './<%= pkg.gruntConfig.clientDir %>',

      paths: rjsConf.paths,
      shim: rjsConf.shim,
      packages: rjsConf.packages
    },


    dependencies: {
      options: {
        create: true,
        name: '<%= pkg.name %>-deps',
        out: '<%= buildTarget %>/scripts/deps.js',
        include: deps
      }
    },

    scripts: {
      options: {
        name: 'camunda-casemanager-ui',
        out: '<%= buildTarget %>/scripts/<%= pkg.name %>.js',
        exclude: deps,
        include: rjsConf.shim['camunda-casemanager-ui']
      }
    }
  };

  return rConf;
};
