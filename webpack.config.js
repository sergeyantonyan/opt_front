var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: {
		page1: './src/page1.js',
		page2: './src/page2.js',
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].entry.js"
	}
};