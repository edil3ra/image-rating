var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html'
})
var HotModuleReplacementConfig = new webpack.HotModuleReplacementPlugin()

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/index.js',
    output: {
        path: __dirname + '/bluid',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    plugins: [HtmlWebpackPluginConfig, HotModuleReplacementConfig]
}
