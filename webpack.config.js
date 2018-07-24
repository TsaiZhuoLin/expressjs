const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: {
    path: path.resolve(__dirname, "docs/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: isProd
          ? [
              "style-loader",
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  resources: "./src/resources/*.scss"
                }
              }
            ]
          : [
              "style-loader",
              "css-loader",
              "postcss-loader",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  resources: "./src/resources/*.scss"
                }
              }
            ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "./img/",
              outputPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "./fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    stats: "errors-only"
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({}), new UglifyJsPlugin({})]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};

console.log(isProd ? "It is Production" : "It is Devolopment");
