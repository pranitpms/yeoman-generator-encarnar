'use strict';
var util = require('util');
var scriptUtil = require('../generatorUtility.js');


var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.generateSourceAndTest(
    'directive',
    'spec/directive',
    'directives',
    this.options['skip-add'] || false
  );
};