const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const uglify = process.env.uglify;

const config = {
  entry: {
    flakeid: "./src/flakeid.js",
    "flakeid.min": "./src/flakeid.js"
  },
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "FlakeId",
    libraryTarget: "umd"
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

module.exports = config;
