const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendors : ['react', 'react-dom', 'react-router-dom']  //提取公共模块
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist/js', '[name]-manifest.json'),

            name: '[name]_library'
        })
    ]
};