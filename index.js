/* eslint-env node */
/* eslint-disable consistent-return */
'use strict';

const fs = require('fs');
const defaults = require('lodash').defaults;
const Funnel = require('broccoli-funnel');

let addons = [];
let namespaceRegExp;
let paths = {};

function getNamespaceRegExp() {
	if (!namespaceRegExp) {
		namespaceRegExp = new RegExp(`^[^\/]+\/(?:templates\/)?((?:${addons.join('|')}\/).+)$`);
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
	config(env, config) {
		config.customAddons = defaults(config.customAddons || {}, {
			path: 'addons',
			exclude: {
				addons: [],
				files: []
			}
		});
		this.options = config;

		return config;
	},

	/**
	 * Set required files paths
	 *
	 * @method _setPaths
	 */
	_setPaths() {
		const options = this.options && this.options.customAddons;
		const config = options ? options : this.project.config().customAddons;
		let projectPath = `${this.app.project.root}/`;

		if (this.isDevelopingAddon()) {
			projectPath += 'tests/dummy/';
		}

		const appPath = `${projectPath}app/`;
		const addonsPath = `${[projectPath, config.path].join('')}/`;

		paths = {
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
	_setAddons() {
		try {
			addons = fs.readdirSync(paths.addons); // eslint-disable-line no-sync
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
	_templatePatterns: () => this.registry.extensionsForType('template').map((extension) => `**/*/template.${extension}`),

	/**
	 * Files to exclude from trees
	 *
	 * @method _getExcludes
	 * @return {Array}
	 */
	_getExcludes() {
		const options = this.options && this.options.customAddons;
		const config = options ? options : this.project.config().customAddons;
		let exclude = [];

		if (config.exclude) {
			if (config.exclude.files) {
				exclude = exclude.concat(config.exclude.files);
			}
			if (config.exclude.addons) {
				const namespacePaths = config.exclude.addons.map((namespace) => `${namespace}/**/*`);

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
	included(app) {
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
	treeForTemplates() {
		if (addons.length) {
			const exclude = ['**/*/*.js'].concat(this._getExcludes());

			const tree = new Funnel(paths.addons, {
				include: this._templatePatterns(),
				exclude
			});

			return tree;
		}

		return null;
	},

	/**
	 * Add addons scripts to the application tree
	 *
	 * @method treeForApp
	 */
	treeForApp() {
		if (addons.length) {
			const exclude = this._templatePatterns().concat(this._getExcludes());

			const tree = new Funnel(paths.addons, {
				include: ['**/*/*.js'],
				exclude
			});

			return tree;
		}

		return null;
	},

	/**
	 * Overrides babel config to rename modules paths
	 *
	 * @method _configureBabel
	 */
	_configureBabel(app) {
		app.options.babel = app.options.babel || {};
		app.options.babel.plugins = app.options.babel.plugins || [];

		const plugins = app.options.babel.plugins;
		const regexp = getNamespaceRegExp();
		const isInjected = plugins.find((plugin) =>
			(plugin[0] === 'modules-regexp' || plugin[0] === 'babel-plugin-modules-regexp') &&
			plugin[1] && plugin[1].regexp === regexp
		);

		if (!isInjected) {
			app.options.babel.plugins.push([
				'modules-regexp', {
					regexp,
					substr: '$1'
				}
			]);
		}
	}

};
