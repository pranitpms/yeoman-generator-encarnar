'use strict';
var path = require('path');
var util = require('util');
var scriptUtil = require('../generatorUtility.js');

var Generator = module.exports = function Generator() {
  scriptUtil.apply(this, arguments);
};

util.inherits(Generator, scriptUtil);

Generator.prototype.createAppFile = function createAppFile() {
  this.angularModules = this.env.options.angularDeps;
  this.ngCookies      = this.env.options.ngCookies;
  this.ngResource     = this.env.options.ngResource;
  this.ngSanitize     = this.env.options.ngSanitize;
  this.uiRoute        = this.env.options.uiRoute;
  this.appTemplate('app', 'scripts/app');
};