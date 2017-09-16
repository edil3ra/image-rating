var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')


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
                loader: 'json-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
				exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
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
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
		host: 'localhost',
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				secure: false
			}
		}
    },
    plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html',
		}),
		new webpack.HotModuleReplacementPlugin({
			// multiStep: true // toogle it make it crash
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		})
		
	]
}
