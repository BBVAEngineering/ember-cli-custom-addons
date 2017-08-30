/* jshint node: true */
'use strict';

var fs = require('fs');
var defaults = require('lodash').defaults;
var Funnel = require('broccoli-funnel');

var addons = [];
var namespaceRegExp;
var paths = {};

function getNamespaceRegExp () {
    if(!namespaceRegExp){
        var namespaces = '(' + addons.join('|') + ')';

        namespaceRegExp = new RegExp('^[^\/]+\/(templates\/)?(' + namespaces + '\/)(.+)$');
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
     * @method setupPreprocessorRegistry
     */
    setupPreprocessorRegistry: function(type, registry) {
        var options = registry.app.options;
        if (options && options.babel) {
            var babel = options.babel;

            babel.getModuleId = babel.getModuleId || function (moduleName) {
                var regExp = getNamespaceRegExp();

                return moduleName.replace(regExp, '$2$4');
            };
        }
    }

};
