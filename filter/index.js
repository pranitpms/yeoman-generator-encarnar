'use strict';
var util = require('util');
var scriptUtil = require('../generatorUtility.js');


var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createFilterFiles = function createFilterFiles() {
  this.generateSourceAndTest(
    'filter',
    'spec/filter',
    'filters',
    this.options['skip-add'] || false
  );
};