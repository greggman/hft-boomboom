const requirejs = require('requirejs');
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname,
  paths: {
    "bower-components": "../3rdparty",
  },
});

requirejs(['./game'], function() {});

