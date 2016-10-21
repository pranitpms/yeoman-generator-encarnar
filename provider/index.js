'use strict';
var util = require('util');
var scriptUtil = require('../generatorUtility.js');

var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createServiceFiles = function createServiceFiles() {
  this.generateSourceAndTest(
    'service/provider',
    'spec/provider',
    'services',
    this.options['skip-add'] || false
  );
};