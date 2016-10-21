'use-strict';

var path         = require('path');
var util         = require('util');
var chalk        = require('chalk');
var yeoman       = require('yoeman-generator');
var angularUtils = require('./utility.js');

var Generator = module.export = function Generator(){

	yeoman.generators.NamedBase.apply(this,arguments);

	var bower = {};

	try{
		bower = require(path.join(process.cwd(), 'bower.json'));
	}catch(e){
		this.log(chalk.magenta(e));
	}

	//Set Application Path values

	if(bower.name){
		this.appName = bower.name;
	}
	else{
		bower.name = path.basename(process.cwd());
		this.appName = bower.name;
	}

	this.appname = this._.slugify(this._.humanize(this.appname));

	this.scriptName = bowerJson.moduleName || this._.camelize(this.appname);

	this.cameledName = this._.camelize(this.name);
  	this.classedName = this._.classify(this.name);

  	if(typeof this.env.option.appPath === 'undefined'){
  		this.env.option.appPath = this.option.appPath || bower.appPath || 'app';
  		this.option.appPath = this.env.option.appPath;
  	}

  	this.env.options.testPath = this.env.options.testPath || bower.testPath || 'test/spec';

  	// Javascript extension and path

  	var sourceRoot = '/templates/javascript';
  	this.scriptSuffix = '.js';
  	this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator,yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.appPath, dest.toLowerCase()) + this.scriptSuffix
  ]);
};

Generator.prototype.testTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.testPath, dest.toLowerCase()) + this.scriptSuffix
  ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.appPath, dest.toLowerCase())
  ]);
};

Generator.prototype.addScriptToIndex = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'index.html');
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="scripts/' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>'
      ]
    });
  } catch (e) {
    this.log.error(chalk.yellow(
      '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
    ));
  }
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory, skipAdd) {
  // Services use classified names
  if (this.generatorName.toLowerCase() === 'service') {
    this.cameledName = this.classedName;
  }

  this.appTemplate(appTemplate, path.join('scripts', targetDirectory, this.name));
  this.testTemplate(testTemplate, path.join(targetDirectory, this.name));
  if (!skipAdd) {
    this.addScriptToIndex(path.join(targetDirectory, this.name));
  }
};