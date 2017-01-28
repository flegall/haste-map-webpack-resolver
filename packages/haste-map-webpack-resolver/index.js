// @flow
// volontary written in ES5, so that it works with Node 4.x
var HasteMapBuilder = require('jest-haste-map');

function HasteMapResolverPlugin(configuration /* : Object */) {
    this._configuration = configuration;
    this._hasteMapPromise = null;

    var self = this;
    this.resolver = {
        apply: function(resolver) {
            resolver.plugin('module', function(request, callback) {
                self._buildHasteMap().then(function (hasteMap) {
                    var module = hasteMap.moduleMap.getModule(request.request);
                    if (module) {
                        callback(null, {
                            path: module,
                            query: request.query,
                            file: true,
                            resolved: true
                        });
                    } else {
                        callback();
                    }
                }).catch(function(error) {
                    console.log(error);
                    throw error;
                });
            });
        }
    };
}

HasteMapResolverPlugin.prototype.apply = function(compiler) {
    var self = this;

    compiler.plugin("emit", function(compilation, callback) {
        self._deleteHasteMap();
        callback();
    });
};

HasteMapResolverPlugin.prototype._buildHasteMap = function() {
    if (!this._hasteMapPromise) {
        var rootPath = this._configuration.rootPath;
        var hasteMapBuilder = new HasteMapBuilder({
            "extensions": [
              "snap",
              "js",
              "json",
              "jsx",
              "node"
            ],
            "ignorePattern": /SOME_COMPLEX_IGNORE_PATTERN_UNLIKELY_TO_HAPPEN/,
            "maxWorkers": 7,
            "name": "haste-map-webpack-resolver-" + rootPath.replace(/[\/\\]/g, '_'),
            "platforms": [
              "ios",
              "android"
            ],
            "providesModuleNodeModules": [],
            "resetCache": false,
            "retainAllFiles": false,
            "roots": [
              rootPath,
            ],
            "useWatchman": true,
        });
        this._hasteMapPromise = hasteMapBuilder.build();
    }

    return this._hasteMapPromise;
};

HasteMapResolverPlugin.prototype._deleteHasteMap = function() {
    this._hasteMapPromise = null;
};

module.exports = HasteMapResolverPlugin;
