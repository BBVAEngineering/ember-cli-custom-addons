/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var defaults = require('lodash').defaults;
var chalk = require('chalk');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
    name: 'ember-cli-custom-addons',
    
    config: function (env, config) {
        config.customAddons = defaults(config.customAddons || {}, {
            path: 'addons'
        });
        return config;
    },
    
    getPaths: function(){
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
    
    getAddons: function() {
        var paths = this.getPaths();
        
        return fs.readdirSync(paths.addons) || [];
    },
    
    treeForApp: function (tree){
        var paths = this.getPaths();
        var addons = this.getAddons();
        
        var trees = addons.map(function(namespace){
            var addonPath = paths.addons + namespace;
            var addonTree = new Funnel(this.treeGenerator(addonPath), {
                srcDir:  '/',
                include: ['**/*'],
                destDir: '/' + namespace + '/'
            });
            
            console.log(chalk.green('Imported addon:'), chalk.cyan(namespace));
            
            return addonTree;
        }.bind(this));
        
        trees.unshift(tree);
        
        return mergeTrees(trees, {overwrite: true});
    },

    included: function(app, parentAddon) {
        
        var target = (parentAddon || app);
        // Now you can modify the app / parentAddon. For example, if you wanted
        // to include a custom preprocessor, you could add it to the target's
        // registry:
        //
        //     target.registry.add('js', myPreprocessor);
        
        
        this._super.included.apply(this, arguments);
    }
};
