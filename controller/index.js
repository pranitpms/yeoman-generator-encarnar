'use strict';
var util = require('util');
var scriptUtil = require('../generatorUtility.js');


var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    'controllers',
    this.options['skip-add'] || false
  );
};