// volontary written in ES5, so that it works with Node 4.x
var HasteMapBuilder = require('jest-haste-map');

/**
 * Builds a Haste Map
 * @param {string} rootPath - The rootPath to search sources for
 * @param {string} prefix - The prefix for the haste map file (optional)
 * @returns {Promise} A promise of the Haste Map
 */
function buildHasteMap(rootPath, prefix) {
    var prefix = prefix || 'haste-map-provider';
    return new HasteMapBuilder({
        "extensions": [
          "snap",
          "js",
          "json",
          "jsx",
          "node"
        ],
        "ignorePattern": /SOME_COMPLEX_IGNORE_PATTERN_UNLIKELY_TO_HAPPEN/,
        "maxWorkers": 7,
        "name": prefix + "-" + rootPath.replace(/[\/\\]/g, '_'),
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
}

module.exports = buildHasteMap;
