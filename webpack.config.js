
var path = require('path');

module.exports = {
	entry: path.resolve('./src/main.js'),
	output: {
		path: '/',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets:['es2015', 'react']
				}
			}

		]
	}
}