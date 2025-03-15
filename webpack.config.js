const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".png", ".jpg"],
    enforceExtension: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          VITE_CUSTOMER: JSON.stringify(process.env.VITE_CUSTOMER),
          REACT_APP_RESEND_API_KEY: JSON.stringify(
            "re_fH5kW59A_KgzV9S2iXc1FSc12mSrdNiy4"
          ),
        },
      },
    }),
  ],
};
