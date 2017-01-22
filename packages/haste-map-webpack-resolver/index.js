// volontary written in ES5, so that it works with Node 4.x
var HasteMap = require('jest-haste-map');

function buildResolver(configuration) {
    var rootPath = configuration.rootPath;
    var hasteMapPromise = new HasteMap({
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
    }).build();

    return {
        apply: function(resolver) {
            resolver.plugin('module', function(request, callback) {
                hasteMapPromise.then(function (hasteMap) {
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
                    throw new Error('Cannot initialize haste map');
                });
            });
        }
    };
}

module.exports = buildResolver;
