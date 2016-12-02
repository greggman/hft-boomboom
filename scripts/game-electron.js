const requirejs = require('requirejs');
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname,
});

requirejs(['./game'], function() {});

