const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/App.js"),
  mode: "development",
  module: {
    rules: [
      {
        // test: /\.jsx?$/,
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png)$/,
        use: ["url-loader"],
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist",
    historyApiFallback: true,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};