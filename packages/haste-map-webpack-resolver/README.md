[![Build Status](https://travis-ci.org/flegall/haste-map-webpack-resolver.svg?branch=master)](https://travis-ci.org/flegall/haste-map-webpack-resolver)

# haste-map-webpack-resolver
A webpack resolver plugin using facebook's haste map.

If like me, you're tired of relative paths for module imports and would like to use facebook's haste map in webpack, now you can !

Some resources on it :
  - https://github.com/facebook/flow/issues/2648
  - https://github.com/facebookarchive/node-haste
  - https://github.com/facebook/jest/tree/master/packages/jest-haste-map

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


