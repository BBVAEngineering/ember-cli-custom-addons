/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var defaults = require('lodash').defaults;
var chalk = require('chalk');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var replace = require('broccoli-replace');

module.exports = {
    name: 'ember-cli-custom-addons',
    
    config: function (env, config) {
        config.customAddons = defaults(config.customAddons || {}, {
            path: 'addons'
        });
        return config;
    },
    
    getPaths: function () {
        var config = this.project.config();
        var appDir = this.treePaths.app;
        var appRegExp = new RegExp('(.+)' + appDir + '$');
        var appPath = [this.app.project.root, this.app.trees.app].join('/');
        var projectPath = appPath.replace(appRegExp, '$1');
        var addonsPath = [projectPath, config.customAddons.path].join('') + '/';
        
        return {
            app: appPath,
            project: projectPath,
            addons: addonsPath
        };
    },
    
    getAddons: function () {
        var paths = this.getPaths();
        
        return fs.readdirSync(paths.addons) || [];
    },
    
    namespacePatterns: function () {
        var addons = this.getAddons();
        
        return addons.map(function (namespace) {
            return {
                match: this.app.name + '/' + namespace,
                replacement: namespace
            }
        }.bind(this));
    },
    
    treeForTemplates: function () {
        var paths = this.getPaths();
        var addons = this.getAddons();
        
        var hbsTree = new Funnel(this.treeGenerator(paths.addons), {
            srcDir:  '/',
            include: ['**/*.hbs'],
            getDestinationPath: function(relPath) {
                console.log(relPath);
                return relPath;
            }
        });
        
        return hbsTree;
    },
    
    treeForApp: function (tree) {
        var paths = this.getPaths();        
        var jsTree = new Funnel(this.treeGenerator(paths.addons), {
            srcDir:  '/',
            include: ['**/*.js'],
            destDir: '/'
        });
        
        return mergeTrees([tree, jsTree], {overwrite: true});
    },

    included: function (app, parentAddon) {
        this._super.included.apply(this, arguments);
    },
    
    postprocessTree: function(type, tree) {
        if (type === 'js') {
            tree = replace(tree, {
                files: ['**/*'],
                patterns: this.namespacePatterns()
            });
        }

        return tree;
    }
};
