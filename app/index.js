	'use-strict';

	var yoeman  = require('yoeman-generator');
	var yosay   = require('yosay');
	var chalk   = require('chalk');
	var wiredep = require('wiredep');
	var fs      = require('fs');
	var path    = require('path');
	var util    = require('util');

	var Generator = module.export = function Generator(args,option){

		yoeman.generators.Base.apply(this,arguments);

		// Set Application Name

		this.appname = ('appname',{ type : String, required : false});
		this.appname = this.appname || path.basename(process.cwd());
		this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

		this.scriptName = this.appname;

		args['main'];

		// Set Application Path

		if(typeof this.env.options.appPath === 'undefined'){
			this.option('appPath',{desc : 'choose application path'});
	

		this.env.options.appPath = this.options.appPath;
		if (!this.env.options.appPath) {
      		try {
        		this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
     		 } catch (e) {}
   		}
   		this.env.options.appPath = this.env.options.appPath || 'app';
   		this.options.appPath = this.env.options.appPath;

		}

		this.appPath = this.env.options.appPath;

		//Hooks for the app

		this.hookFor('angular:common', {
	    args: args
	 	 });

	  	this.hookFor('angular:main', {
	    args: args
	 	 });

	  	this.hookFor('angular:controller', {
	    args: args
	  	});

	  	//Bower Options
	  	var bowerComments = [
      		'bower:js',
      		'endbower'
    	];

        this.pkg = require('../package.json');
	    this.sourceRoot(path.join(__dirname, '../templates/common'));
	};

	util.inherits(Generator,yoeman.generators.Base);

	Generator.proptotype.welcome = function welcome(){
		if(!this.option['skip-welcome-message']){
			this.log(yosay());
			this.log(chalk.magenta('including bootrap and required angular modules'));
		}
	};

	Generator.proptotype.askForBootstrap  = function askForBootstrap (){
		var done =  this.async();

		this.prompt([{
			type    : 'confirm',
			name    : 'bootstrap',
			message : 'would you like to add bootstrap in your app?',
			default : true

		}],function(props){
			this.bootstrap = props.bootstrap;
			done();
		}.bind(this));
	};

	Generator.proptotype.addModules = function addModules() {
		var done = this.async();
		var angModules = [];

		angModules.push("'ngAnimate'");
		angModules.push("'ngCookies'");
		angModules.push("'ngResource'");
		angModules.push("'ngSanitize'");
		angModules.push("'ngTouch'");
		angModules.push("'ui-router'");

		if (angMods.length) {
      		this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
    	}

		this.prompt([{
			type    : 'confirm',
			name    : 'angular madules',
			message : 'Installing angular modules, do you want to proceed with?',
			default : true
		}],function(props){
			props.modules.push({value: 'animateModule' , name: 'angular-animate.js'   });
			props.modules.push({value: 'cookiesModule' , name: 'angular-cookies.js'   });
			props.modules.push({value: 'resourceModule', name: 'angular-resource.js'  });
			props.modules.push({value: 'sanitizeModule', name: 'angular-sanitize.js'  });
			props.modules.push({value: 'touchModule'   , name: 'angular-touch.js'     });
			props.modules.push({value: 'ui-router'     , name: 'angular-ui-router.js' });

			done();
		}.bind(this));
	};

	Generator.proptotype.readIndex = function readIndex (){
		this.uiRoute = true;
		this.indexFile = this.engine(this.read('app/index.html'), this);
	};

	Generator.proptotype.bootstrapFiles = function bootstrapFiles (){
		var cssFile = 'styles/main.css';
		this.copy(
			path.join('app',cssFile),
			path.join(this.appPath,cssFile)
		);
	};

	Generator.proptotype.appJsFile = function appJsFile(){
		this.indexFile = this.appendFiles({
	    	html: this.indexFile,
    		fileType: 'js',
    		optimizedPath: 'scripts/scripts.js',
    		sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    		searchPath: ['.tmp', this.appPath]
  		});
	};

	Generator.proptotype.indexFile = function indexFile(){
		this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  		this.write(path.join(this.appPath, 'index.html'), this.indexFile);
	};

	Generator.prototype.packageFiles = function packageFiles() {
  		this.template('root/_bower.json', 'bower.json');
  		this.template('root/_bowerrc', '.bowerrc');
  		this.template('root/_package.json', 'package.json');
    	this.template('root/_Gruntfile.js', 'Gruntfile.js');
  		this.template('root/README.md', 'README.md');
	};

	Generator.prototype._injectDependencies = function _injectDependencies() {
  		var taskRunner = 'grunt';
  		if (this.options['skip-install']) {
    		this.log(
      			'After running `npm install & bower install`, inject your front end dependencies' +
     			 '\ninto your source code by running:' +
     			 '\n' +
      			'\n' + chalk.yellow.bold(taskRunner + ' wiredep')
   		 	);
  		} else {
    	this.spawnCommand(taskRunner, ['wiredep']);
  		}	
	};


