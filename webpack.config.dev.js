const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	inject: true,
	template: __dirname + '/src/index.html'
});

module.exports = {
	mode: 'development',
	entry: __dirname + '/src/index.js',
	module: {
		rules:
		[{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.html$/,
			exclude: /node_modules/,
			loader: 'raw-loader'
		}]
	},
	resolve: {
		alias: {
			'inferno': 'inferno/dist/index.dev.esm.js',
		},
		extensions: ['.js', '.jsx'],
	},
	output: {
		filename: 'js/index.js',
		path: __dirname + '/mobile/www'
	},
	plugins: [
		HTMLWebpackPluginConfig
	]
};
