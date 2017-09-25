/* eslint-env node */
'use strict';

var fs = require('fs');
var defaults = require('lodash').defaults;
var Funnel = require('broccoli-funnel');

var addons = [];
var namespaceRegExp;
var paths = {};

function getNamespaceRegExp() {
	if (!namespaceRegExp) {
		namespaceRegExp = new RegExp('^[^\/]+\/(?:templates\/)?((?:' + addons.join('|') + '\/).+)$');
	}

	return namespaceRegExp;
}

module.exports = {

	name: 'ember-cli-custom-addons',

	/**
	 * Initialize addons configuration
	 *
	 * @method config
	 */
	config: function (env, config) {
		config.customAddons = defaults(config.customAddons || {}, {
			path: 'addons',
			exclude: {
				addons: [],
				files: []
			}
		});

		return config;
	},

	/**
	 * Set required files paths
	 *
	 * @method _setPaths
	 */
	_setPaths: function () {
		var config = this.project.config();
		var appDir = this.treePaths.app;
		var projectPath = this.app.project.root + '/';

		if(this.isDevelopingAddon()){
			projectPath += 'tests/dummy/';
		}

		var appPath = projectPath + 'app/';
		var addonsPath = [projectPath, config.customAddons.path].join('') + '/';

		paths =  {
			app: appPath,
			project: projectPath,
			addons: addonsPath
		};
	},

	/**
	 * Set addons names
	 *
	 * @method _setAddons
	 */
	_setAddons: function () {
		try {
			addons = fs.readdirSync(paths.addons);
		} catch (e) {
			addons = [];
		}
	},

	/**
	 * Project templates patterns
	 *
	 * @method _templatePatterns
	 * @return {Array}
	 */
	_templatePatterns: function() {
		return this.registry.extensionsForType('template').map(function(extension) {
			return '**/*/template.' + extension;
		});
	},

	/**
	 * Files to exclude from trees
	 *
	 * @method _getExcludes
	 * @return {Array}
	 */
	_getExcludes: function() {
		var config = this.project.config().customAddons;
		var exclude = [];

		if(config.exclude){
			if(config.exclude.files){
				exclude = exclude.concat(config.exclude.files);
			}
			if(config.exclude.addons){
				var namespacePaths = config.exclude.addons.map(function(namespace){
					return namespace + '/**/*';
				});
				exclude = exclude.concat(namespacePaths);
			}
		}

		return exclude;
	},

	/**
	 * Initialize paths & addons
	 *
	 * @method included
	 */
	included: function(app) {
		this._super.included.apply(this, arguments);

		this._setPaths();
		this._setAddons();
		this._configureBabel(app);
	},

	/**
	 * Add addons templates to the application tree
	 *
	 * @method treeForTemplates
	 */
	treeForTemplates: function () {
		if (addons.length) {
			var exclude = ['**/*/*.js'].concat(this._getExcludes());

			var tree = new Funnel(paths.addons, {
				include: this._templatePatterns(),
				exclude: exclude
			});

			return tree;
		}
	},

	/**
	 * Add addons scripts to the application tree
	 *
	 * @method treeForApp
	 */
	treeForApp: function () {
		if (addons.length) {
			var exclude = this._templatePatterns().concat(this._getExcludes());

			var tree = new Funnel(paths.addons, {
				include: ['**/*/*.js'],
				exclude: exclude
			});

			return tree;
		}
	},

	/**
	 * Overrides babel config to rename modules paths
	 *
	 * @method _configureBabel
	 */
	_configureBabel(app) {
		app.options.babel = app.options.babel || {};
		app.options.babel.plugins = app.options.babel.plugins || [];

		var plugins = app.options.babel.plugins;
		var regexp = getNamespaceRegExp();
		var isInjected = plugins.find(plugin =>
			(plugin[0] === 'modules-regexp' || plugin[0] === 'babel-plugin-modules-regexp') &&
			plugin[1] && plugin[1].regexp === regexp
		);

		if (!isInjected) {
			app.options.babel.plugins.push([
				'modules-regexp', {
					regexp: regexp,
					substr: '$1'
				}
			]);
		}
	}

};
