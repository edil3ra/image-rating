var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: __dirname + '/app/index.js',
    output: {
        path: __dirname + '/build',
        filename: '[name]-[hash].js'
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
				loader: ExtractTextPlugin.extract('style', 'css?modules')
            }
        ]
    },

    plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.html"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
    ]
}
