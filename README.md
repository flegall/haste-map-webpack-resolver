[![Build Status](https://travis-ci.org/flegall/haste-map-webpack-resolver.svg?branch=master)](https://travis-ci.org/flegall/haste-map-webpack-resolver)

# haste-map-webpack-resolver
A webpack resolver plugin using facebook's haste map.

In CommonJS all require() calls to internal modules are using relative paths. 

This can be a pain in mono-repositories:
  - referencing a module requires some relative path computation (very often trial and error).
  - when moving files to different folders, most require() calls have to be updated.

Facebook's Haste map can be useful for that, each module is assigned a unique name using the @providesModule annotation that can be required() by its name.

Since Jest, Flow & React Native are already supporting it, having a webpack resolver is the last thing you need to use it on node.js and on web bundles.

Some resources on it :
  - https://facebook.github.io/react/contributing/codebase-overview.html#custom-module-system
  - https://github.com/facebook/flow/issues/2648
  - https://github.com/facebookarchive/node-haste
  - https://github.com/facebook/jest/tree/master/packages/jest-haste-map
  
This implementation is based on jest-haste-map, the haste map implementation used by Jest runner.

## Usage in webpack 1 
Add the following code to [your webpack configuration file](https://github.com/flegall/haste-map-webpack-resolver/blob/master/packages/haste-map-webpack-resolver-demo-webpack/webpack.config.js):
```
var HasteMapWebPackResolver = require('haste-map-webpack-resolver');

    ....
    // Within the configuration object:
    plugins: [
        new webpack.ResolverPlugin([
            new HasteMapWebPackResolver({
                rootPath: path.resolve(__dirname, '.'),  // The root directory
            })
        ]),
    ],
```
I've written [a fully working webpack 1 demo](https://github.com/flegall/haste-map-webpack-resolver/tree/master/packages/haste-map-webpack-resolver-demo-webpack)

## Usage in webpack 2 
Add the following code to [your webpack configuration file](https://github.com/flegall/haste-map-webpack-resolver/blob/master/packages/haste-map-webpack-resolver-demo-webpack2/webpack.config.js):
```
var HasteMapWebPackResolver = require('haste-map-webpack-resolver');

    ....
    // Within the configuration object:
    resolve: {
        plugins: [new HasteMapWebPackResolver({
            rootPath: path.resolve(__dirname, '.'), // The root directory
        })],
    },
```
I've written [a fully working webpack 2 demo](https://github.com/flegall/haste-map-webpack-resolver/tree/master/packages/haste-map-webpack-resolver-demo-webpack2)


