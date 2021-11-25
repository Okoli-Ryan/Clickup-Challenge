const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/app/index.js"),
  mode: "development",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "/styles/[name].css" }),
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: "./src/public/index.html",
      filename: "index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|jpg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
            },
          },
        ],
        // type: "asset/resource",
      },
      {
        test: /\.(otf|ttf)$/i,
        // loader: "url-loader",
        // options: {
        //   limit: 50000,
        //   mimetype: "application/font-ttf",
        //   name: "/assets/fonts/[name].[ext]",
        // },
        type: "asset/resource",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
