const requirejs = require('requirejs');
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname,
  paths: {
    "bower-components": "../bower_components",
  },
});

requirejs(['./game'], function() {});

