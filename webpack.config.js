const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname + '/lib/TSVReader.js')],
    output: {
        path: __dirname + '/build',
        filename: 'TSVReader.js',
        libraryTarget: 'umd',
        library: 'TSVReader'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2016"]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};