const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	devtool: false,
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
});
