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
                loader: 'json-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules'),
            },
            {
				test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
            {
				test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
				loader: 'file-loader',
			}
        ]
    },

    plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.html"
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
    ]
}
