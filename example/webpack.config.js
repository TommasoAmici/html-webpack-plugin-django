const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginDjango = require("html-webpack-plugin-django");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const templateContent = ({ htmlWebpackPlugin }) =>
  `{% load static %}${htmlWebpackPlugin.tags.headTags}${htmlWebpackPlugin.tags.bodyTags}`;

module.exports = () => {
  return {
    entry: {
      index: "./myapp/static/index.ts",
    },
    output: {
      path: path.resolve("myapp/static/dist"),
      filename: "js/[name].[contenthash].js",
      publicPath: "/static/",
    },
    module: {
      rules: [
        {
          test: /\.{js,ts}$/,
          use: "esbuild-loader",
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "esbuild-loader",
              options: {
                loader: "css",
                minify: true,
              },
            },
          ],
        },
      ],
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
      new MiniCssExtractPlugin(),
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
