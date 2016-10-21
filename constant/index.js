'use strict';
var util = require('util');
var scriptUtil = require('../generatorUtility.js');


var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createServiceFiles = function createServiceFiles() {
  this.generateSourceAndTest(
    'service/constant',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );
};