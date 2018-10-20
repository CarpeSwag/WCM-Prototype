const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	inject: true,
	template: __dirname + '/src/index.html',
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
		removeEmptyAttributes: true,
		removeStyleLinkTypeAttributes: true,
		keepClosingSlash: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true,
	},
});

module.exports = {
	mode: 'production',
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
			loader: 'raw-loader!html-minifier-loader'
		}]
	},
	resolve: {
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
