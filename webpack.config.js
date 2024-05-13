const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js|\.jsx|\.ts|\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".png", ".jpg"],
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".png", ".jpg"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
