/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var defaults = require('lodash').defaults;
var chalk = require('chalk');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
    name: 'ember-cli-custom-addons',
    
    config: function (env, config) {
        config.customAddons = defaults(config.customAddons || {}, {
            path: 'addons'
        });
        return config;
    },
    
    getAddons: function(dir) {
        return fs.readdirSync(dir) || [];
    },
    
    treeForApp: function (tree){
        var config = this.project.config();
        var appDir = this.treePaths.app;
        var appRegExp = new RegExp('(.+)' + appDir + '$');
        var appPath = [this.app.project.root, this.app.trees.app].join(path.sep);
        var projectPath = appPath.replace(appRegExp, '$1');
        var addonsPath = [projectPath, config.customAddons.path].join('');
        var addons = this.getAddons(addonsPath);
        
        console.log(chalk.green(addons));
        
        addons.forEach(function(namespace){
            //app.trees[namespace] = addonsPath + namespace + '/';
        });
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
