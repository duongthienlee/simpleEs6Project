const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const PATHS = {
  input: path.join(__dirname, "/../src/")
};
const config = {
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.gif', '.png', '.jpg', '.jpeg', '.svg', '.ico'],
    alias: {
      config: `${PATHS.input}config/${process.env.NODE_ENV || "development"}.js`,
      actions: `${PATHS.input}actions`,
      reducers: `${PATHS.input}reducers`,
      components: `${PATHS.input}components`,
      containers: `${PATHS.input}containers`,
      assets: `${PATHS.input}assets`,
      style: `${PATHS.input}style`
    }
  },
  plugins: [
    () => {
      this.plugin("done", (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf("--watch") === -1) {
          console.log(stats.compilation.errors);
          process.exit(1); // or throw new Error('webpack build failed.');
        }
      });
    },
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebPackPlugin({
      template: `${PATHS.input}index.html`,
      filename: "./index.html",
      favicon: `${PATHS.input}favicon.png`
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css',
    }),
    new CopyWebpackPlugin([
      { from: "src/assets", to: "src/assets" }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',//Hot Module Reloading (HMR)
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: "url-loader"
      },
    ]
  }
};

module.exports = config;
