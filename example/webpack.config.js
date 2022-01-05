const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginDjango = require("html-webpack-plugin-django");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const templateContent = ({ htmlWebpackPlugin }) =>
  `{% load static %}
  ${htmlWebpackPlugin.tags.headTags}
  ${htmlWebpackPlugin.tags.bodyTags}`;

module.exports = () => {
  return {
    entry: {
      index: "./myapp/static/index.js",
    },
    output: {
      path: path.resolve("myapp/static/dist"),
      filename: "js/[name].[contenthash].js",
      publicPath: "/static/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        appMountId: "index",
        filename: path.resolve(__dirname, "templates", "webpack.html"),
        inject: false,
        templateContent: templateContent,
        scriptLoading: "defer",
        hash: false,
        minify: false,
        cache: true,
      }),
      new HtmlWebpackPluginDjango({ bundlePath: "dist" }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: [".js", ".html", ".css"],
    },
    optimization: {
      usedExports: true,
      moduleIds: "deterministic",
      runtimeChunk: "single",
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: ["**/webpack.html"],
    },
  };
};
