const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css 独立打包
const website = {
    // publicPath: "http://10.41.12.11:1717/"
}
module.exports = {
    context: path.join(__dirname, '../'),
    devtool: 'eval-source-map',
    entry: {
        client: './client/client.js',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js' //注意这里，用[name]可以自动生成路由名称对应的js文件
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             root: path.resolve(__dirname, 'views'),
            //             attrs: ['img:src', 'link:href']
            //         }
            //     }]
            // },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /favicon\.png$/,
                use: [{
                    loader: 'file-loader',
                    /*
                      name: 指定文件输出名
                      [name]是源文件名, 不包含后缀. [ext]为后缀. [hash]为源文件的hash值,
                      这里我们保持文件名, 在后面跟上hash, 防止浏览器读取过期的缓存文件.
                    */
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },
    resolve: {//其他解决方案
        alias: {
            '~': path.resolve(__dirname, 'client')
        },
        // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
        extensions: ['.js', '.jsx', '.json', '.coffee']
    },
    plugins: [//配置插件
        new HtmlWebpackPlugin({
            template: './views/tpl/index.tpl.html',
            filename: '../views/dev/index.html',
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./dist/js/vendors-manifest.json')
        // }),
        /*
        使用CommonsChunkPlugin插件来处理重复代码
        因为vendor.js和index.js都引用了spa-history, 如果不处理的话, 两个文件里都会有spa-history包的代码,
        我们用CommonsChunkPlugin插件来使共同引用的文件只打包进vendor.js
        */
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        /*
        首先把重复引用的库打包进vendor.js, 这时候我们的代码里已经没有重复引用了, chunk文件名存在vendor.js中,
        然后我们在执行一次CommonsChunkPlugin, 把所有chunk的文件名打包到manifest.js中.
        这样我们就实现了chunk文件名和代码的分离. 这样修改一个js文件不会导致其他js文件在打包时发生改变, 只有manifest.js会改变.
        */
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),
        //定义服务端变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
}